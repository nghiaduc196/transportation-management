import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateReportWorkComponent } from './update-report-work/update-report-work.component';
import { ListReportWorkComponent } from './list-report-work/list-report-work.component';
import {ReportWorkRoutingModule} from './report-work-routing.module';
import {ToastModule} from 'primeng/toast';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {PaginatorModule} from 'primeng/paginator';
import {ReactiveFormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {RippleModule} from 'primeng/ripple';



@NgModule({
  declarations: [
    UpdateReportWorkComponent,
    ListReportWorkComponent
  ],
  imports: [
    CommonModule,
    ReportWorkRoutingModule,
    ToastModule,
    NgbDropdownModule,
    PaginatorModule,
    ReactiveFormsModule,
    ButtonModule,
    RippleModule
  ]
})
export class ReportWorkModule { }
