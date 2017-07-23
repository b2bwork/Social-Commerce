import { UserfinanceComponent } from './userfinance/userfinance.component';
import { UserDataComponent } from './user-data/user-data.component';
import { UserAddressComponent } from './user-address/user-address.component';


import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'] ,
  entryComponents:[UserAddressComponent , UserDataComponent , UserfinanceComponent]
})
export class UserProfileComponent implements OnInit {
  isUserData: boolean = true;
  isUserAddress: boolean = false;
  isUserFinance: boolean = false;

  constructor() { }

  onUserAddress(){
    this.isUserAddress = true;
    this.isUserData = false;
    this.isUserFinance =false;
  }

  onUserData(){
    this.isUserAddress = false;
    this.isUserData = true;
    this.isUserFinance =false;
  }

  onUserFinance(){
    this.isUserAddress = false;
    this.isUserData = false;
    this.isUserFinance =true;
  }

  ngOnInit() {
  }

}
