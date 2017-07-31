import gql  from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-loged',
  templateUrl: './loged.component.html',
  styleUrls: ['./loged.component.css']
})
export class LogedComponent implements OnInit {
  

  userData: any;
  constructor(private redirect: ActivatedRoute , private routing: Router ,private apollo: Apollo) { 
    redirect.params.subscribe((params)=>{
      localStorage.setItem('provider', params.Provider);
      localStorage.setItem('userID',params.Token)
      routing.navigate(['/']);
    })
  }

  ngOnInit() {
  }

}
