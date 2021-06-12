import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserRouteAccessService} from '../../core/services/user-route-access.service';
import {ProfileComponent} from './profile.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [UserRouteAccessService],
    component: ProfileComponent,
    data: {
      title: 'Thông tin cá nhân'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
