import { Router } from '@angular/router';
import gql  from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { Component, OnInit , EventEmitter } from '@angular/core';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes } from 'ngx-uploader';

@Component({
  selector: 'addpoll-product',
  templateUrl: './addpoll-product.component.html',
  styleUrls: ['./addpoll-product.component.css']
})
export class AddpollProductComponent implements OnInit {
  name = '';
  productNames = [];
  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;
  addPollMutation = gql`
  mutation add(	$userID:String!,
                $userName:String!,
                $products:productsDetail){
    addPollProducts(	userID:$userID , 
                      userName:$userName,
                      products: $products){
      _id
    }
  }
  `

  constructor(private apollo: Apollo , private router: Router) {
    this.files = [];
    this.uploadInput = new EventEmitter<UploadInput>(); 
    this.humanizeBytes = humanizeBytes;
  }

  onUploadOutput(output: UploadOutput): void {
    if (output.type === 'allAddedToQueue') { 
    } else if (output.type === 'addedToQueue'  && typeof output.file !== 'undefined') {
      this.files.push(output.file);
    } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
      const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
      this.files[index] = output.file;
    } else if (output.type === 'removed') {
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
    } else if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
      this.dragOver = false;
    } else if (output.type === 'drop') {
      this.dragOver = false;
    }
  }

  cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id: id });
  }

  removeFile(id: string): void {
    this.uploadInput.emit({ type: 'remove', id: id });
  }
  startUpload(_id): void {
    console.log(_id)
    const event: UploadInput = {
      type: 'uploadAll',
      url: 'http://localhost:3001/poll/Image',
      method: 'POST',
      data: { _id:_id }
    };

    this.uploadInput.emit(event);
  }

  addPoll(product1 , product2){
    this.apollo.mutate({mutation: this.addPollMutation , variables:{
      userID: localStorage.getItem('userID'),
      userName: localStorage.getItem('fullName'),
      products: {
        "productName": [
          product1 , product2
        ],
        "productScore": [0,0]
      }
    }}).subscribe((data)=>{
      let returnData: any = data.data;
      this.startUpload(returnData.addPollProducts._id);
      this.router.navigate(['/pollproducts']);
    })

  }
  ngOnInit() {
  }

}
