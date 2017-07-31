import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { Component, OnInit, ChangeDetectorRef, } from '@angular/core';
import gql from 'graphql-tag';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userImageQuery = gql`
    query image($UserID: String!){
      userProfile(UserID: $UserID){
        profileImage
      }
    }
  `;
  userData: any;
  userAuth: boolean = false;
  userImage: string ;
  constructor(private apollo: Apollo ,private cdRef:ChangeDetectorRef , private router: Router) { 
    setTimeout(()=>{
      if(localStorage.getItem('userID') != null && localStorage.getItem('provider') == 'Google'){
        apollo.watchQuery({query: this.userImageQuery , variables:{
          UserID: localStorage.getItem('userID') ,
        }}).subscribe(({data , loading})=>{
          this.userAuth = true;
          this.userData = data;
          let {userProfile} = this.userData;
          let image = userProfile.profileImage;
          this.userImage = image.replace('sz=200','sz=40');
          cdRef.detectChanges();
        })
    }else if(localStorage.getItem('userID') != null && localStorage.getItem('provider') == 'Facebook'){
      apollo.watchQuery({query: this.userImageQuery , variables:{
        UserID: localStorage.getItem('userID') ,
      }}).subscribe(({data , loading})=>{
        this.userAuth = true;
        this.userData = data;
        let {userProfile} = this.userData;
        this.userImage = userProfile.profileImage;
        cdRef.detectChanges();
      })
    }else{
      router.navigate(['/']);
    }
    },500);    
  }

  logout(){
    localStorage.removeItem('userID');
    localStorage.removeItem('provider');
    localStorage.removeItem('profileImage');
  }
  
  ngOnInit() {
  }

}
