import { Component, OnInit } from '@angular/core';
import {ReportWorkService} from '../../../core/services/report-work.service';

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
  constructor(private reportWorkService: ReportWorkService) { }

  ngOnInit(): void {
    this.getListReportWork();
  }

  getListReportWork() {
    const param = {
      page: this.pageIndex,
      size: this.pageSize,
      sort: this.sort
    };
    this.reportWorkService.getAll(param).subscribe(res => {
      this.sortedData = res.body;
      for (let i = 0; i < this.sortedData.length; i++) {
        if (this.sortedData[i].images) {
          this.sortedData[i].images = JSON.parse(this.sortedData[i].images);
        }
      }
      console.log(this.sortedData);
      this.totalData = res.headers.get('X-Total-Count');
    });
  }

  paginate($event) {
  }

  openEdit(data) {}

  delete(data) {}
}
