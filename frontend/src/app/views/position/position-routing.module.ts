import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {UserRouteAccessService} from '../../core/services/user-route-access.service';
import {PositionComponent} from './position.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [UserRouteAccessService],
    component: PositionComponent,
    data: {
      title: 'Danh sách vị trí'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PositionRoutingModule {}
