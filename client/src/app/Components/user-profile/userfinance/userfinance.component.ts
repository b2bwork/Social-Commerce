import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'user-finance',
  templateUrl: './userfinance.component.html',
  styleUrls: ['./userfinance.component.css']
})
export class UserfinanceComponent implements OnInit {

  userFinanceQuery = gql`
    query finace($UserID: String!){
      userFinace(UserID: $UserID){
        creditCardUserName
        creditCardNumber
        creditCardDate
        creditCardYear
        creditCardCVC
      }
    }
  `

  userFinanceMutation = gql`
    mutation updatefinace( $UserID: String! ,
                           $creditCardUserName: String! ,
                           $creditCardNumber: String! ,
                           $creditCardDate: String! ,
                           $creditCardYear: String! ,
                           $creditCardCVC: String!){
                             
                updataFinace( _id: $UserID ,
                              creditCardUserName: $creditCardUserName ,
                              creditCardNumber: $creditCardNumber ,
                              creditCardDate: $creditCardDate ,
                              creditCardCVC: $creditCardCVC ,
                              creditCardYear: $creditCardYear){
                  _id
                }

    }
  `;
  loading: boolean;
  userData: any;
  userFinace: any;
  userCreditCardUserName: String;
  userCreditCardNumber: String;
  userCreditCardDate: String;
  userCreditCardYear: String;
  userCreditCardCVC: String;

  constructor(private apollo: Apollo) { 
    this.queryUserFinace();
  }

  queryUserFinace(){
    this.apollo.watchQuery({query: this.userFinanceQuery , 
      variables:{
        UserID: localStorage.getItem('userID') ,
      }}).subscribe(({data , loading})=>{

        this.loading = loading;
        this.userData = data;
        let {userFinace} = this.userData;
        this.userCreditCardUserName = userFinace.creditCardUserName;
        this.userCreditCardNumber = userFinace.creditCardNumber;
        this.userCreditCardDate = userFinace.creditCardDate;
        this.userCreditCardCVC = userFinace.creditCardCVC;
        this.userCreditCardYear = userFinace.creditCardYear;
      })
  }

  mutationUserFinance(){
    console.log(this.userCreditCardCVC);
    console.log(this.userCreditCardYear);
    this.apollo.mutate({mutation: this.userFinanceMutation ,
      variables:{
        UserID: localStorage.getItem('userID'),
        creditCardUserName: this.userCreditCardUserName ,
        creditCardNumber: this.userCreditCardNumber ,
        creditCardDate: this.userCreditCardDate ,
        creditCardYear: this.userCreditCardYear ,
        creditCardCVC: this.userCreditCardCVC ,
      } }).subscribe((data)=>{
        console.log(data);
      })
  }
  ngOnInit() {
  }

}
