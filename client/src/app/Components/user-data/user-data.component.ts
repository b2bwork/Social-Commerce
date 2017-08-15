import gql  from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {
  userDataQuery = gql`
    
  `;
  constructor(private apollo: Apollo) { }

  ngOnInit() {
  }

}
