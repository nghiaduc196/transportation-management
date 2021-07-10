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
import {NgSelectModule} from '@ng-select/ng-select';
import {NgxCurrencyModule} from 'ngx-currency';
import {CalendarModule} from 'primeng/calendar';
import { ReportDetailComponent } from './report-detail/report-detail.component';
import {CarouselModule} from 'primeng/carousel';



@NgModule({
  declarations: [
    UpdateReportWorkComponent,
    ListReportWorkComponent,
    ReportDetailComponent
  ],
    imports: [
        CommonModule,
        ReportWorkRoutingModule,
        ToastModule,
        NgbDropdownModule,
        PaginatorModule,
        ReactiveFormsModule,
        ButtonModule,
        RippleModule,
        NgSelectModule,
        NgxCurrencyModule,
        CalendarModule,
        CarouselModule
    ]
})
export class ReportWorkModule { }
