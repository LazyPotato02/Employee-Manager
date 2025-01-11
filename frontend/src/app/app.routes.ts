import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './auth/login/login.component';
import {LogoutComponent} from './auth/logout/logout.component';
import {AuthGuard} from './services/guards/auth-guard';
import {CellsComponent} from './cells/cells.component';
import {OrdersComponent} from './orders/orders.component';
import {MaterialsComponent} from './materials/materials.component';
import {EmployeesComponent} from './employees/employees.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'orders', component: OrdersComponent, canActivate: [AuthGuard]},
    {path: 'materials', component: MaterialsComponent, canActivate: [AuthGuard]},
    {path: 'employees', component: EmployeesComponent, canActivate: [AuthGuard]},
    {path: 'cells/:id', component: CellsComponent, canActivate: [AuthGuard]},
    {path: 'login', component: LoginComponent,},
    {path: 'logout', component: LogoutComponent, canActivate: [AuthGuard]},

];
