import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.scss']
})
export class ReportDetailComponent implements OnInit {
  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];
  products = [
    'https://primefaces.org/primeng/showcase/assets/showcase/images/demo/product/bracelet.jpg',
    'https://primefaces.org/primeng/showcase/assets/showcase/images/demo/product/bracelet.jpg'
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
