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
    {path: 'postreview' , component: UserpostreviewComponent}
]

export const routing = RouterModule.forRoot(routes,{ useHash: true });