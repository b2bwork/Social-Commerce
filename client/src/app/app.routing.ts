import { ListcategorysComponent } from './Components/listcategorys/listcategorys.component';
import { IndexCategoryComponent } from './Components/index-category/index-category.component';

import { RouterModule , Routes} from '@angular/router';

const routes: Routes = [
    {path: '' , component: IndexCategoryComponent }
]

export const routing = RouterModule.forRoot(routes,{ useHash: true });