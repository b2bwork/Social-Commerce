import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { routing} from './app.routing'


import { ApolloModule } from 'apollo-angular';
import { Client } from './../apolloClient';

import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { IndexCategoryComponent } from './Components/index-category/index-category.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    IndexCategoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ApolloModule.forRoot(Client),
    routing,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
