import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userpostreview',
  templateUrl: './userpostreview.component.html',
  styleUrls: ['./userpostreview.component.css']
})
export class UserpostreviewComponent implements OnInit {
  froalaConfig: Object = {
    placeholderText: 'add your review',
    charCounterCount: false,
    imageUploadURL: 'http://localhost:3001/review_image',
    height: 450,
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

  constructor(private apollo: Apollo, private router: Router) {
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
          this.router.navigate(['/']);
        } else if (returndata.userPostReview.userID == 'fail') {
          this.posted = 'เกิดปัญหาการโพส';
        }
      });
    }else{
      this.posted = 'โปรดกรอกข้อมูลให้ครบ';
    }
  }

  ngOnInit() {
  }

}
