import gql  from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { Component, OnInit , } from '@angular/core';

@Component({
  selector: 'user-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.css']
})

export class UserAddressComponent implements OnInit {
  userAddressQuery = gql`
    query userAddressQuery($userID: String!){
      userAddress(UserID: $userID){
        fullNameAddress
        address
        city
        province
        postalCode
        phoneNumber
      }
    }
  `

  userAddressMutation = gql`
    mutation userAddressMutation(
      $userID: String! ,
      $fullNameAddress: String ,
      $address: String ,
      $city: String ,
      $province: String ,
      $postalCode: String ,
      $phoneNumber: String
    ){
        updateUserAddress( userID: $userID ,
                           fullNameAddress: $fullNameAddress ,
                           address: $address ,
                           city: $city ,
                           province: $province ,
                           postalCode: $postalCode ,
                           phoneNumber: $phoneNumber){
            _id
        }
    }
  `
  userData: any;
  Data: any;
  loading: boolean;
  userfullNameAddress: String ;
  userAddress: String ; 
  userCity: String;
  userProvince: String ;
  userPostalCode: String ;
  userPhoneNumber: String ;
  updated: String = '';

  constructor(private apollo:Apollo) { 
    this.queryUserAddress();
  }

  queryUserAddress(){
    this.apollo.watchQuery({query: this.userAddressQuery , variables:{
      userID: localStorage.getItem("userID")
    }}).subscribe(({data , loading})=>{
      this.Data = data;
      this.loading = loading;
      let {userAddress} = this.Data;
      this.userData = userAddress;
      this.userfullNameAddress = userAddress.fullNameAddress;
      this.userAddress = userAddress.address;
      this.userCity = userAddress.city;
      this.userProvince = userAddress.province;
      this.userPostalCode = userAddress.postalCode;
      this.userPhoneNumber = userAddress.phoneNumber;

    });
  }

  updataAddress(){
    console.log(this.userPostalCode)
    this.apollo.mutate({mutation:this.userAddressMutation , variables:{
      userID: localStorage.getItem('userID'),
      fullNameAddress: this.userfullNameAddress,
      address:this.userAddress ,
      city: this.userCity ,
      province: this.userProvince ,
      postalCode: this.userPostalCode ,
      phoneNumber: this.userPhoneNumber ,
    }}).subscribe((data)=>{
      this.updated = 'แก้ไข้ข้อมูลเรียบร้อย'
      console.log(data)
    })
    
  }

  ngOnInit() {
  }

}
