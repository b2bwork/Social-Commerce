import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes } from 'ngx-uploader';

@Component({
  selector: 'app-userpostreview',
  templateUrl: './userpostreview.component.html',
  styleUrls: ['./userpostreview.component.css']
})
export class UserpostreviewComponent implements OnInit {
  froalaConfig: Object = {
    charCounterCount: false,
    imageUploadURL: 'http://localhost:3001/review_image',
    height: 450,
    toolbarButtons: ['bold', 'italic', 'underline',
      'fontSize', 'color', '|', 'paragraphFormat', 'align'
      , 'outdent', 'indent', 'quote', 'insertLink', 'insertImage',],
    toolbarButtonsSM: ['bold', 'italic', 'underline',
      'fontSize', 'color', '|', 'paragraphFormat', 'align'
      , 'outdent', 'indent', 'quote', 'insertLink', 'insertImage',],
      toolbarButtonsXS: ['bold', 'italic', 'underline',
      'fontSize', 'color', '|', 'paragraphFormat', 'align'
      , 'outdent', 'indent', 'quote', 'insertLink', 'insertImage',],
  }

  userPostReviewMutation = gql`
    mutation post(
      $userID: String! ,
      $userName: String! ,
      $userImage: String! , 
      $title: String! , 
      $category: String! ,
      $content: String
    ){
      userPostReview(   userID: $userID ,
                        userName: $userName ,
                        userImage: $userImage , 
                        title: $title , 
                        category: $category ,
                        content: $content ){
                          userID
                          _id
                        }
    }
  `;

  listCategorysQuery = gql`
    query{
      liscategory{
        name
      }
    }
`;

  userReviewContent: String = '';
  userReviewTitle: String = '';
  userReviewCategory: String = '';
  categorys: any;
  posted: String = '';
  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;
  previewImage: any;

  constructor(private apollo: Apollo, private router: Router) {
    this.files = [];
    this.uploadInput = new EventEmitter<UploadInput>();
    this.humanizeBytes = humanizeBytes;
    this.listCategory();
  }
  listCategory() {
    this.apollo.watchQuery({ query: this.listCategorysQuery }).subscribe(({ data, loading }) => {
      let returndata: any = data;
      let { liscategory } = returndata
      this.categorys = liscategory;
    })
  }

  postReview() {
    if (this.userReviewCategory.length > 0 || this.userReviewTitle.length > 0 || this.userReviewContent.length > 0) {
      this.apollo.mutate({
        mutation: this.userPostReviewMutation, variables: {
          userID: localStorage.getItem('userID'),
          userName: localStorage.getItem('fullName'),
          userImage: localStorage.getItem('profileImage'),
          title: this.userReviewTitle,
          category: this.userReviewCategory,
          content: this.userReviewContent,
        }
      }).subscribe((data) => {
        let returndata: any = data.data;
        if (returndata.userPostReview.userID == 'success') {
          this.startUpload(returndata.userPostReview._id);
          this.router.navigate(['/reviews']);
        } else if (returndata.userPostReview.userID == 'fail') {
          this.posted = 'เกิดปัญหาการโพส';
        }
      });
    } else {
      this.posted = 'โปรดกรอกข้อมูลให้ครบ';
    }
  }

  onUploadOutput(output: UploadOutput) {
    if (output.type === 'allAddedToQueue') {
    } else if (output.type === 'addedToQueue') {

      this.files.push(output.file);

    } else if (output.type === 'uploading') {
      const index = this.files.findIndex(file => file.id === output.file.id);
      this.files[index] = output.file;
    } else if (output.type === 'removed') {
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
    }
  }

  readUrl(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event) => {
        let data: any = event.target;
        this.previewImage = data.result;
      }

      reader.readAsDataURL(event.target.files[0]);
    }
  }
  startUpload(_id): void {
    const event: UploadInput = {
      type: 'uploadAll',
      url: 'http://localhost:3001/review/coverImage',
      method: 'POST',
      data: { _id: _id },
      concurrency: 1
    }

    this.uploadInput.emit(event);
  }
  ngOnInit() {
  }

}
