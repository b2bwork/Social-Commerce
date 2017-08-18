import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'user-transaction-history',
  templateUrl: './user-transaction-history.component.html',
  styleUrls: ['./user-transaction-history.component.css']
})
export class UserTransactionHistoryComponent implements OnInit {
  transactionHistoryQuery = gql`
  query list($userID:String!){
    transactionHistory(userID:$userID){
      quantity
      createdTime
      productID
      productName
      productImage
      productPrice
      price
    }
  }
  `;

  listTransaction: any;
  loading: Boolean;
  constructor(private apollo: Apollo) { 
    this.listTransactionHistory();
  }

  ngOnInit() {
  }

  listTransactionHistory() {
    this.apollo.watchQuery({
      query: this.transactionHistoryQuery, variables: {
        userID: localStorage.getItem('userID')
      }
    }).subscribe(({ data, loading }) => {
      this.loading = loading;
      let {transactionHistory}: any = data;
      this.listTransaction = transactionHistory;
    })
  }
}
