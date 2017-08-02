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
  userAddComment = gql`
    mutation uercomment(	$reviewID:String!, 
  										$userID:String! ,
											$userName:String! ,
											$userImage:String! ,
											$comment:String!){
      commentReview(	reviewID:$reviewID , 
                      userID: $userID ,
                      userName:$userName ,
                      userImage:$userImage ,
                      comment:$comment){
        _id
      }
      
    }
  `;
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

  reviewID: String;
  comment: String;
  useraddCommentName: String;
  useraddID: String;
  useraddCommentImage: String;
  reviewData: any;
  reviewComment: any[] = [];
  fakeComment: any[] = [];
  loading: boolean
  constructor(private apollo: Apollo, private routing: ActivatedRoute) {
    this.useraddCommentName = localStorage.getItem('fullName');
    this.useraddID = localStorage.getItem('userID');
    this.useraddCommentImage = localStorage.getItem('profileImage');
    routing.params.subscribe((params) => {
      this.reviewID = params.ReviewID;
      this.reviewContent(params.ReviewID);
    });
  }

  reviewContent(_id: String) {
    this.apollo.watchQuery({
      query: this.reviewContenQuery, variables: {
        reviewID: _id
      }
    })
      .subscribe(({ data, loading }) => {
        let returndata: any = data;
        let { reviewContent, reviewComment } = returndata;
        this.reviewData = reviewContent;
        this.reviewComment = reviewComment;
        this.loading = loading;

      });
  }

  addComment() {
    if (this.comment.length > 0) {
      this.apollo.mutate({
        mutation: this.userAddComment, variables: {
          reviewID: this.reviewID,
          userID: localStorage.getItem('userID'),
          userName: localStorage.getItem('fullName'),
          userImage: localStorage.getItem('profileImage'),
          comment: this.comment,
        }
      });
      this.fakeComment.push({
        userID: localStorage.getItem('userID'),
        userName: localStorage.getItem('fullName'),
        userImage: localStorage.getItem('profileImage'),
        comment: this.comment,
      })
      this.comment = '';

    }
  }

  ngOnInit() {
  }

}
