import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent }   from './dashboard.component';
import { SchoolComponent }      from './school.component';
import { SchoolDetailsComponent} from './school-details.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'schools',
        component: SchoolComponent
    },
    {
        path: 'detail/:id',
        component: SchoolDetailsComponent
    }
]

export const routing = RouterModule.forRoot(appRoutes);