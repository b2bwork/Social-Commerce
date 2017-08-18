import { UserTransactionHistoryComponent } from './Components/user-transaction-history/user-transaction-history.component';
import { PaidsuccessComponent } from './Components/paidsuccess/paidsuccess.component';
import { UserDataComponent } from './Components/user-data/user-data.component';
import { AddpollProductComponent } from './Components/addpoll-product/addpoll-product.component';
import { ListpollproductComponent } from './Components/listpollproduct/listpollproduct.component';
import { ReviewcontentComponent } from './Components/reviewcontent/reviewcontent.component';
import { ListpostreviewComponent } from './Components/listpostreview/listpostreview.component';
import { UserpostreviewComponent } from './Components/userpostreview/userpostreview.component';
import { PayProductComponent } from './Components/pay-product/pay-product.component';
import { ProductcontentComponent } from './Components/productcontent/productcontent.component';
import { ListproductsComponent } from './Components/listproducts/listproducts.component';
import { LogedComponent } from './Components/loged/loged.component';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';
import { ListcategorysComponent } from './Components/listcategorys/listcategorys.component';

import { RouterModule , Routes} from '@angular/router';

const routes: Routes = [
    {path: '' , component: ListcategorysComponent },
    {path: 'myprofile', component: UserProfileComponent} ,
    {path: 'authed/:Provider/:Token' , component: LogedComponent} ,
    {path: 'products/:Category' , component: ListproductsComponent} ,
    {path: 'buyproduct/:ProductID' ,component: ProductcontentComponent} ,
    {path: 'pay/:ProductID', component: PayProductComponent} ,
    {path: 'postreview' , component: UserpostreviewComponent} ,
    {path: 'reviews' , component: ListpostreviewComponent},
    {path: 'reviews/content/:ReviewID' , component: ReviewcontentComponent},
    {path: 'pollproducts' , component: ListpollproductComponent},
    {path: 'addpoll' , component: AddpollProductComponent},
    {path: 'user/:userID' , component: UserDataComponent},
    {path: 'paidsuccess' , component: PaidsuccessComponent},
    {path: 'transactions' , component: UserTransactionHistoryComponent}
]

export const routing = RouterModule.forRoot(routes,{ useHash: true });