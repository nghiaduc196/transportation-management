import { Component, OnInit } from '@angular/core';
import {ReportWorkService} from '../../../core/services/report-work.service';
import {FormControl} from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-list-report-work',
  templateUrl: './list-report-work.component.html',
  styleUrls: ['./list-report-work.component.scss']
})
export class ListReportWorkComponent implements OnInit {
  sortedData = [];
  totalData: any = 0;
  pageSizeOption = [5, 10, 20];
  pageSize = 10;
  pageIndex = 0;
  sort = 'createdDate,desc';
  createdDates = new FormControl(null);
  implementationDates = new FormControl(null);
  name = new FormControl(null);
  createdDateFrom: any;
  createdDateTo: any;
  implementationDateFrom: any;
  implementationDateTo: any;
  constructor(private reportWorkService: ReportWorkService) { }

  ngOnInit(): void {
    this.getListReportWork();
    this.createdDates.valueChanges.subscribe(res => {
      this.createdDateFrom = moment(res[0]).format('yyyy-MM-DD');
      this.createdDateTo = null;
      if (res[1] != null) {
        this.createdDateTo = moment(res[1]).format('yyyy-MM-DD');
      }
      this.pageIndex = 0;
      this.getListReportWork();
    });
    this.name.valueChanges.subscribe(res => {
      this.pageIndex = 0;
      this.getListReportWork();
    });
    this.implementationDates.valueChanges.subscribe(res => {
      this.implementationDateFrom = moment(res[0]).format('yyyy-MM-DD');
      this.implementationDateTo = null;
      if (res[1] != null) {
        this.implementationDateTo = moment(res[1]).format('yyyy-MM-DD');
      }
      this.pageIndex = 0;
      this.getListReportWork();
    });
  }

  getListReportWork() {
    const param = {
      page: this.pageIndex,
      size: this.pageSize,
      sort: this.sort,
      createdDateFrom: this.createdDateFrom,
      createdDateTo: this.createdDateTo,
      name: this.name.value,
      implementationDateFrom: this.implementationDateFrom,
      implementationDateTo: this.implementationDateTo
    };
    this.reportWorkService.getAll(param).subscribe(res => {
      this.sortedData = res.body;
      for (let i = 0; i < this.sortedData.length; i++) {
        if (this.sortedData[i].images) {
          this.sortedData[i].images = JSON.parse(this.sortedData[i].images);
        }
      }
      this.totalData = res.headers.get('X-Total-Count');
    });
  }

  paginate($event) {
    console.log($event);
    this.pageIndex = $event.page;
    this.pageSize = $event.rows;
    this.getListReportWork();
  }

  openEdit(data) {}

  delete(data) {}
}
