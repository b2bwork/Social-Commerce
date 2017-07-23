import { UserProfileComponent } from './Components/user-profile/user-profile.component';
import { ListcategorysComponent } from './Components/listcategorys/listcategorys.component';
import { IndexCategoryComponent } from './Components/index-category/index-category.component';

import { RouterModule , Routes} from '@angular/router';

const routes: Routes = [
    {path: '' , component: IndexCategoryComponent },
    {path: 'myprofile', component: UserProfileComponent} ,
]

export const routing = RouterModule.forRoot(routes,{ useHash: true });