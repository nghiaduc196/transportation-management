import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}
