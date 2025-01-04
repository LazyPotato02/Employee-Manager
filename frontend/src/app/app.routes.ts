import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './auth/login/login.component';
import {LogoutComponent} from './auth/logout/logout.component';
import {AuthGuard} from './services/guards/auth-guard';
import {CellsComponent} from './cells/cells.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  { path: 'create-order', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'cells/:id', component: CellsComponent, canActivate: [AuthGuard] },
  {path: 'login', component: LoginComponent, },
  {path: 'logout', component: LogoutComponent, canActivate: [AuthGuard]},

];
