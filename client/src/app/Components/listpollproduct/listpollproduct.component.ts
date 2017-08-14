import { Apollo } from 'apollo-angular';
import { Component, OnInit , OnDestroy } from '@angular/core';
import gql from "graphql-tag";
import { Subscription } from "apollo-client";

@Component({
  selector: 'listpollproduct',
  templateUrl: './listpollproduct.component.html',
  styleUrls: ['./listpollproduct.component.css']
})
export class ListpollproductComponent implements OnInit ,OnDestroy {
  sub: Subscription;
  listpollProductQuery = gql`
    query{
      listPollProduct{
        _id
        userID
        userName
        products{
          productName
          productImage
          productScore
        }
      }
    }
  `
  userVoteProduct = gql`
    mutation update($_id: String! , 
                    $userID: String! ,
                    $productName:String!){
      updateProductPollScore( _id: $_id , 
                              userID: $userID ,
                              productName: $productName){
        _id
      }
    }
  `
  pollProducts = [];
  loading: Boolean;
  percentScore: any[] = [];
  fakeScore = [];


  constructor(private apollo: Apollo) {
    this.listPollProducts();
  }
  listPollProducts() {
   this.sub = this.apollo.watchQuery({ query: this.listpollProductQuery,pollInterval: 5000 })
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        let returnData: any = data;
        let { listPollProduct } = returnData;
        this.pollProducts = listPollProduct;
        for (let index = 0; index < this.pollProducts.length; index++) {
          this.sortScoreToPercent(this.pollProducts[index].products.productScore, index);
        }
      });
  }

  sortScoreToPercent(productScore: any[], indexel: any) {
    let max = productScore[0];
    for (var index = 0; index < productScore.length; index++) {
      if (max < productScore[index]) {
        max = productScore[index]
      }
    }
    let fake = [];
    for (var index = 0; index < productScore.length; index++) {
      let percent = (productScore[index] / max) * 100;
      fake.push([percent, productScore[index], max]);
    }
    this.percentScore.push(fake)
  }

  voteProduct(_id, indexPoll, indexProduct, productName) {
    this.apollo.mutate({
      mutation: this.userVoteProduct, variables: {
        _id: _id,
        userID: localStorage.getItem("userID"),
        productName: productName
      }
    }).subscribe((data) => {
      let returndata: any = data.data;
      if (returndata.updateProductPollScore._id == 'plus') {
        this.percentScore[indexPoll][indexProduct][1] += 1;
        let percent = (this.percentScore[indexPoll][indexProduct][1]
          / this.percentScore[indexPoll][indexProduct][2]) * 100;
        this.percentScore[indexPoll][indexProduct][0] = percent;
        this.sortNewScoreToPercent(indexPoll);
      }else if(returndata.updateProductPollScore._id == 'minus'){

      }
    })

  }

  sortNewScoreToPercent(indexPoll) {
    let max = this.percentScore[indexPoll][0][1];
    for (var index = 0; index < this.percentScore[indexPoll].length; index++) {
      if (max < this.percentScore[indexPoll][index][1]) {
        max = this.percentScore[indexPoll][index][1]
      }
    }
    let fake = [];
    for (var index = 0; index < this.percentScore[indexPoll].length; index++) {
      let percent = (this.percentScore[indexPoll][index][1] / max) * 100;
      this.percentScore[indexPoll][index][0] = percent;
    }
  }


  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


}
