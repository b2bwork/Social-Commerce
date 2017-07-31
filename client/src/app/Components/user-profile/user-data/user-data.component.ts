import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Component({
  selector: 'user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {

  userDataMutataion = gql`
    mutation($UserID: String! ,
             $fullName: String ,
             $email: String ,
             $bio: String){
      updateUserProfile(_id: $UserID ,
                        fullName: $fullName ,
                        email: $email ,
                        bio: $bio){
        _id
      }

    }
  `;
  userDataQuery = gql`
    query userprofile($UserID: String!) {
      userProfile(UserID: $UserID ){
         _id
        fullName
        email
        bio
        profileImage
      }
    }
  `;
  userData: any;
  Data: any;
  loading: boolean;
  userFullName: String;
  userEmail: String;
  userBio: String;
  userPicture: String
  updated: String = '';

  constructor(private apollo: Apollo) { 
    this.queryData();
  }

  queryData(){
    this.apollo.watchQuery({query: this.userDataQuery,
      variables:{
       UserID: localStorage.getItem("userID")
    }}).subscribe(({data , loading})=>{
      console.log(data)
      this.loading = loading;
      this.Data = data;
      let {userProfile} = this.Data;
      this.userData = userProfile;
      this.userFullName = userProfile.fullName;
      this.userEmail = userProfile.email;
      this.userBio = userProfile.bio;
      this.userPicture = userProfile.profileImage;

    })
  }

  updataData(){
    this.apollo.mutate({mutation: this.userDataMutataion , variables:{
      UserID:  localStorage.getItem("userID") ,
      fullName: this.userFullName ,
      email: this.userEmail , 
      bio: this.userBio ,
    }}).subscribe((data)=>{console.log(data)
      this.updated = 'แก้ไข้ข้อมูลเรียบร้อย'
    })
  }

  ngOnInit() {
  }

}
