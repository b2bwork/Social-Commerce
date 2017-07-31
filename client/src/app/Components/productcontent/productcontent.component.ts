import { Apollo } from 'apollo-angular';
import { ActivatedRoute } from '@angular/router';
import gql from 'graphql-tag';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-productcontent',
  templateUrl: './productcontent.component.html',
  styleUrls: ['./productcontent.component.css']
})
export class ProductcontentComponent implements OnInit {
  productContentQuery = gql`
    query product($ProductID:String!){
      productContent(_id: $ProductID){
        _id
        name
        description
        price
        images
      } 
    }
  `;

  product: any;
  productName: String;
  loading: boolean;
  constructor(private routeParams: ActivatedRoute, private apollo: Apollo) {
    routeParams.params.subscribe((param) => {
      this.productContent(param.ProductID);
    })
  }
  productContent(ProductID: String) {
    this.apollo.watchQuery({
      query: this.productContentQuery, variables: {
        ProductID: ProductID
      }
    }).subscribe(({ data, loading }) => {
      let Data: any;
      this.loading = loading;
      Data = data;
      let { productContent } = Data;
      this.product = productContent;

      console.log(this.product)
    })

  }

  ngOnInit() {
  }

}
