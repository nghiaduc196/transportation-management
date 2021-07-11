import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.scss']
})
export class ReportDetailComponent implements OnInit {
  responsiveOptions = [
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];
  detailReport: any;
  products = [
    'https://primefaces.org/primeng/showcase/assets/showcase/images/demo/product/bracelet.jpg',
    'https://img.nhandan.com.vn/Files/Images/2020/07/26/giai_thuong_lon-1595747403778.jpg',
    'https://img.nhandan.com.vn/Files/Images/2020/07/26/nhat_nhiep_anh_gia-1595747471173.jpg',
    'https://primefaces.org/primeng/showcase/assets/showcase/images/demo/product/bracelet.jpg'
  ];
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getDetailReport();
  }

  getDetailReport() {
    this.route.data.subscribe(({ report }) => {
      this.detailReport = report.body;
      if (report.body.images) {
        this.detailReport.images = JSON.parse(this.detailReport.images);
      }
      console.log(this.detailReport);

    });
  }

}
