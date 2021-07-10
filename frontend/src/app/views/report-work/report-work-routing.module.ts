import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {UserRouteAccessService} from '../../core/services/user-route-access.service';
import {ListReportWorkComponent} from './list-report-work/list-report-work.component';
import {UpdateReportWorkComponent} from './update-report-work/update-report-work.component';
import {ReportDetailComponent} from './report-detail/report-detail.component';

const routes: Routes = [
  {
    path: 'list',
    canActivate: [UserRouteAccessService],
    component: ListReportWorkComponent,
    data: {
      title: 'Danh sách báo cáo công việc'
    }
  },
  {
    path: 'create',
    canActivate: [UserRouteAccessService],
    component: UpdateReportWorkComponent,
    data: {
      title: 'Báo cáo công việc'
    }
  },
  {
    path: ':id/detail',
    canActivate: [UserRouteAccessService],
    component: ReportDetailComponent,
    data: {
      title: 'Chi tiết báo cáo công việc'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportWorkRoutingModule {}
