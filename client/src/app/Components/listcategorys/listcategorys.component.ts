import { Component, OnInit } from '@angular/core';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import gql from 'graphql-tag';
import 'rxjs/add/operator/map';

@Component({
  selector: 'listcategorys',
  templateUrl: './listcategorys.component.html',
  styleUrls: ['./listcategorys.component.css']
})
export class ListcategorysComponent implements OnInit {

  listCategorysQuery = gql`
    query{
      liscategory{
        _id
        name
        coverImage
      }
    }
`;
  data: any;
  loading: boolean;
  listcategorys: any;
  loged: boolean = false;
  constructor(private list: Apollo) {
    this.listCategory();
  }
  listCategory() {
    if (localStorage.getItem('userID') != null && localStorage.getItem('provider') != null) {
      this.list.watchQuery({ query: this.listCategorysQuery }).subscribe(({ data, loading }) => {
        this.data = data;
        let { liscategory } = this.data;
        this.listcategorys = liscategory;
        this.loading = loading
        this.loged = true
      })
    } else {
      this.list.watchQuery({ query: this.listCategorysQuery }).subscribe(({ data, loading }) => {
        this.data = data;
        let { liscategory } = this.data;
        this.listcategorys = liscategory;
        this.loading = loading
        this.loged = false
      })
    }
  }

  ngOnInit() {
  }

}
