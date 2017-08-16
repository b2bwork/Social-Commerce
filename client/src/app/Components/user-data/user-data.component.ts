import { UserReviewsComponent } from './../user-reviews/user-reviews.component';
import { UserPollsComponent } from './../user-polls/user-polls.component';
import { Subscription } from 'apollo-client';
import { ActivatedRoute } from '@angular/router';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { Component, OnInit , OnDestroy } from '@angular/core';

@Component({
  selector: 'userdata',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css'],
  entryComponents: [UserPollsComponent , UserReviewsComponent]
})
export class UserDataComponent implements OnInit , OnDestroy {
  sub: Subscription;
  userDataQuery = gql`
  query profile($UserID:String!){
    userProfile(UserID:$UserID){
      profileImage
      fullName
      bio
    }
    listUserReview(userID:$UserID){
      _id
      coverImage
      title
    }
    listUserPollProduct(userID:$UserID){
      _id
      products{
        productName
        productImage
        productScore
      }
    }
  }
  `;
  loading: Boolean = true;
  userProfile: any;
  userPollProducts: any;
  userReviews: any;
  userID: String;

  constructor(private apollo: Apollo, private routeParam: ActivatedRoute) {
    routeParam.params.subscribe((params) => {
      this.userID = params.userID;
      this.loaduserProfile(params.userID);
    });
  }

  loaduserProfile(userID) {
    this.sub = this.apollo.watchQuery({
      query: this.userDataQuery, variables: {
        UserID: userID
      }
    }).subscribe(({data , loading})=>{     
      let returnData: any = data
      this.loading = loading;
      let {userProfile ,listUserPollProduct ,listUserReview} = returnData;
      this.userPollProducts = listUserPollProduct;
      this.userReviews = listUserReview;
      this.userProfile = userProfile;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}

export default UserDataComponent
