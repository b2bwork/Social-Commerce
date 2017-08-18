import { Router } from '@angular/router';
import { UserAddressComponent } from './../user-profile/user-address/user-address.component';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

@Component({
  selector: 'app-pay-product',
  templateUrl: './pay-product.component.html',
  styleUrls: ['./pay-product.component.css'],
  entryComponents:[UserAddressComponent]
})
export class PayProductComponent implements OnInit {
  payProductMutation = gql`
  mutation buy($tokenID:String! , $products:productForBuy , $userID: String!){
    buyProduct( Products:$products,
                tokenID:$tokenID , 
                userID: $userID ){
      created
    }
  }
  `

  productQuery = gql`
  query product($ProductID:String!){
    productContent(_id: $ProductID){
      _id
      name
      price
      images
    } 
  }`;
  productData: any;
  loading: boolean = true;
  name: String;
  number: String;
  expiration_month: number;
  expiration_year: number;
  security_code: number;
  error: String = '';
  productQuanity: number = 0;
  resultPrice: number;

  constructor(private http: Http, private apollo: Apollo,private router: Router, private route: ActivatedRoute) {
    route.params.subscribe((param) => {
      apollo.watchQuery({
        query: this.productQuery, variables: {
          ProductID: param.ProductID
        }
      }).subscribe((data) => {
        let { productContent }: any = data.data;
        this.loading = data.loading;
        this.productData = productContent;
      })
    });
  }

  ngOnInit() {

  }

  buy(productID: String, productName: String, productPrices: any) {
    this.resultPrice = this.productQuanity * productPrices;
    let header = new Headers();
    header.append("Authorization", 'Basic cGtleV90ZXN0XzU3dm84OGhyeHpjcHp1aHp6cmc6');

    this.http.post('https://vault.omise.co/tokens', {
      card: {
        "name": this.name,
        "number": this.number,
        "expiration_month": this.expiration_month,
        "expiration_year": this.expiration_year,
        "security_code": this.security_code,
      }
    }, {
        headers: header
      }).subscribe((data) => {
        let tokenID = data.json();
        this.apollo.mutate({
          mutation: this.payProductMutation, variables: {
            products: {
              productID: productID,
              productNames: productName,
              quantitys: this.productQuanity,
              productPrices: productPrices,
              price: this.resultPrice,
            },
            tokenID: tokenID.id,
            userID: localStorage.getItem('userID')
          }
        }).subscribe(({data , loading}) => {
          let returnData: any = data;
          console.log(data);
          if(returnData.buyProduct.created == true){
            this.router.navigate(['paidsuccess']);
          }else{
            this.error = "เกิดปัญหาในการชำระ"
          }
        });
      });
  }
}
