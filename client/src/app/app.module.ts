import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { routing} from './app.routing'


import { ApolloModule } from 'apollo-angular';
import { Client } from './../apolloClient';

import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { IndexCategoryComponent } from './Components/index-category/index-category.component';
import { ListcategorysComponent } from './Components/listcategorys/listcategorys.component';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    IndexCategoryComponent,
    ListcategorysComponent,
    UserProfileComponent
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
