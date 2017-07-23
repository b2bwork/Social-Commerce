import { Apollo } from 'apollo-angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'user-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.css']
})
export class UserAddressComponent implements OnInit {

  constructor(private apollo:Apollo) { }

  ngOnInit() {
  }

}
