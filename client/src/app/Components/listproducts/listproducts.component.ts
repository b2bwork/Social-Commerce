import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql  from 'graphql-tag';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listproducts',
  templateUrl: './listproducts.component.html',
  styleUrls: ['./listproducts.component.css']
})
export class ListproductsComponent implements OnInit {
  listProductsQuery = gql`
    query list($typeId:String!){
      listproducts(typeId: $typeId){
        _id
        name
        description
        images
        price
      }
    }
  `;

  data: any;
  products: any;
  loading: boolean;
  constructor(private apollo: Apollo ,private routing : ActivatedRoute , private router: Router) { 
    if(localStorage.getItem('userID') != null && localStorage.getItem('provider') != null){
      routing.params.subscribe((param)=>{
      this.listProducts(param.Category);
    });
    }else{
      router.navigate(['/']);
    }
   

  }
  listProducts(categoryId : String){
    this.apollo.watchQuery({query: this.listProductsQuery,variables:{
      typeId: categoryId
    }}).subscribe(({data , loading})=>{
      this.data = data;
      let {listproducts} = this.data;
      this.products = listproducts;
      this.loading = loading;

    })
  }

  ngOnInit() {
  }

}
