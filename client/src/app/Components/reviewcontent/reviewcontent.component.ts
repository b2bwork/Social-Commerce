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
    query review($_id:String!){
      reviewContent(_id:$_id){
        _id
        coverImage
        userName
        userImage
        title
        content
      }
    }
  `;

  reviewData : any;
  loading: boolean
  constructor(private apollo: Apollo , private routing: ActivatedRoute) { 
    routing.params.subscribe((params)=>{
      this.reviewContent(params.ReviewID);
    });
  }

  reviewContent(_id: String ){
    this.apollo.watchQuery({query: this.reviewContenQuery,variables:{
      _id: _id
    }})
      .subscribe(({ data, loading })=>{
        let returndata: any = data;
        let {reviewContent} = returndata;
        this.reviewData = reviewContent;
        this.loading = loading;

      });
  }

  ngOnInit() {
  }

}
