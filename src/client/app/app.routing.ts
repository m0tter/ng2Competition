import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent }   from './dashboard.component';
import { SchoolComponent }      from './school.component';

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
    }
]

export const routing = RouterModule.forRoot(appRoutes);