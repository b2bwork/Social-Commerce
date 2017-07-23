import { Apollo } from 'apollo-angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {
  loading: boolean ;

  constructor(private apollo: Apollo) { 

  }


  ngOnInit() {
  }

}
