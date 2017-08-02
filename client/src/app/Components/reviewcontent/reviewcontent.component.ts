import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'reviewcontent',
  templateUrl: './reviewcontent.component.html',
  styleUrls: ['./reviewcontent.component.css'] 
})
export class ReviewcontentComponent implements OnInit {

  reviewContenQuery = gql`
    query review($reviewID:String!){
      reviewContent(_id:$reviewID){
        _id
        coverImage
        userName
        userImage
        title
        content
      }
      reviewComment(reviewID:$reviewID){
        _id
        userName
        userImage
        userID
        comment
      }
    }
  `;

  reviewData : any;
  reviewComment: any;
  loading: boolean
  constructor(private apollo: Apollo , private routing: ActivatedRoute) { 
    routing.params.subscribe((params)=>{
      this.reviewContent(params.ReviewID);
    });
  }

  reviewContent(_id: String ){
    this.apollo.watchQuery({query: this.reviewContenQuery,variables:{
      reviewID: _id
    }})
      .subscribe(({ data, loading })=>{
        let returndata: any = data;
        let {reviewContent , reviewComment} = returndata;
        this.reviewData = reviewContent;
        this.reviewComment = reviewComment;
        console.log(reviewComment)
        this.loading = loading;

      });
  }

  ngOnInit() {
  }

}
