import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'user-reviews',
  templateUrl: './user-reviews.component.html',
  styleUrls: ['./user-reviews.component.css']
})
export class UserReviewsComponent implements OnInit {
  @Input() userID: String;
  reviewsQuery = gql`
    query list($UserID: String!){
      listUserReview(userID:$UserID){
        _id
        coverImage
        title
      }
    }
  `
  userReviews: any;


  constructor(private apollo: Apollo) {
    apollo.watchQuery({
      query: this.reviewsQuery, variables: {
        UserID: this.userID
      }
    }).subscribe((data)=>{
      let returnData: any = data;
      console.log()
      this.userReviews = data
    })
  }



  ngOnInit() {
  }

}
