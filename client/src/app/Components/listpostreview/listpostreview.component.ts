import { Apollo } from 'apollo-angular';
import gql  from 'graphql-tag';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listpostreview',
  templateUrl: './listpostreview.component.html',
  styleUrls: ['./listpostreview.component.css']
})
export class ListpostreviewComponent implements OnInit {
  listReviewsQuery = gql`
    query listReview($userID:String!){
      listPostReview(userID:$userID){
        _id
        userName
        userImage
        title
        content
        coverImage
      }
    }
  `;
  reviews: any;
  loading : boolean;
  constructor(private apollo: Apollo) { 
    this.listreviews();
  }

  listreviews(){
    this.apollo.watchQuery({query: this.listReviewsQuery ,variables:{
      userID: localStorage.getItem('userID')
    }}).subscribe(({data, loading})=>{
      let returnData: any = data;
      let {listPostReview} = returnData;
      this.loading = loading;
      this.reviews = listPostReview;
    });
  }


  ngOnInit() {
  }

}
