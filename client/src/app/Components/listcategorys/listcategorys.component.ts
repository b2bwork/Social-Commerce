import { Component, OnInit } from '@angular/core';
import { Apollo ,ApolloQueryObservable} from 'apollo-angular';
import gql from 'graphql-tag';
import 'rxjs/add/operator/map';

@Component({
  selector: 'listcategorys',
  templateUrl: './listcategorys.component.html',
  styleUrls: ['./listcategorys.component.css']
})
export class ListcategorysComponent implements OnInit {

 listCategorysQuery = gql`
    query {
     listCategory{
         Name
         Image
     }
}
`;
  listCategorys: any;
  loading: boolean;
   
  constructor(private list: Apollo) { 

  }

  ngOnInit() {
    this.list.watchQuery({ query: this.listCategorysQuery }).subscribe(({data, loading})=>{
      this.listCategorys = data;
      this.loading = loading
    })
  }

}
