import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
declare var Omise: any;
@Component({
  selector: 'app-pay-product',
  templateUrl: './pay-product.component.html',
  styleUrls: ['./pay-product.component.css']
})
export class PayProductComponent implements OnInit {

  constructor(private http: Http) { }

  ngOnInit() {

  }

  add() {
    let header = new Headers();
    header.append("Authorization",'Basic cGtleV90ZXN0XzU3dm84OGhyeHpjcHp1aHp6cmc6');
    
    this.http.post('https://vault.omise.co/tokens', {
      card: {
        "name": "ssss",
        "number": "4242424242424242",
        "expiration_month": 2,
        "expiration_year": 2020,
        "security_code": 112
      }
    },{
      headers: header
    }).subscribe((data)=>{
      let a = data.json();
      console.log(a.id)
    });
  }



}
