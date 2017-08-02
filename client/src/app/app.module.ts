import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { NgUploaderModule } from 'ngx-uploader';
import { routing } from './app.routing'


import { ApolloModule } from 'apollo-angular';
import { Client } from './../apolloClient';

import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { ListcategorysComponent } from './Components/listcategorys/listcategorys.component';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';
import { UserDataComponent } from './Components/user-profile/user-data/user-data.component';
import { UserAddressComponent } from './Components/user-profile/user-address/user-address.component';
import { UserfinanceComponent } from './Components/user-profile/userfinance/userfinance.component';
import { LogedComponent } from './Components/loged/loged.component';
import { ListproductsComponent } from './Components/listproducts/listproducts.component';
import { ProductcontentComponent } from './Components/productcontent/productcontent.component';
import { PayProductComponent } from './Components/pay-product/pay-product.component';
import { UserpostreviewComponent } from './Components/userpostreview/userpostreview.component';
import { ListpostreviewComponent } from './Components/listpostreview/listpostreview.component';
import { ReviewcontentComponent } from './Components/reviewcontent/reviewcontent.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListcategorysComponent,
    UserProfileComponent,
    UserDataComponent,
    UserAddressComponent,
    UserfinanceComponent,
    LogedComponent,
    ListproductsComponent,
    ProductcontentComponent,
    PayProductComponent,
    UserpostreviewComponent,
    ListpostreviewComponent,
    ReviewcontentComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ApolloModule.forRoot(Client),
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    routing,
    NgUploaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
