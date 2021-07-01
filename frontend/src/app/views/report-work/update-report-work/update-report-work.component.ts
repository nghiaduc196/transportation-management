import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {UserService} from '../../../core/services/user.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-update-report-work',
  templateUrl: './update-report-work.component.html',
  styleUrls: ['./update-report-work.component.scss']
})
export class UpdateReportWorkComponent implements OnInit {
  requestDTO = this.fb.group({
    id: [null],
    nameCustomer: [null, Validators.required],
    phoneCustomer: [null],
    addressStart: [null],
    addressEnd: [null],
    description: [null],
    totalMoney: [null],
    workersDetailRequestDTOS: [null]
  });
  listOldImage = [];
  listImage = [];
  fileList = [];
  isPickedImage = false;
  listWorkers = [];
  selectedWorkerIds = [];
  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.getListWorkers();
  }

  getListWorkers(): void {
    const param = {
      size: 1000,
      page: 0,
    };
    this.userService.getAllWorkers(param).subscribe(res => {
      this.listWorkers = res.body;
    });
  }

  detectFiles(event): void {
    const files = event.target.files;
    if (files) {
      try {
        Array.prototype.push.apply(this.fileList, files);
        for (const file of files) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.listImage.push(e.target.result);
          };
          reader.readAsDataURL(file);
          this.isPickedImage = true;
        }
      } catch (error) {}
    }
  }

  removeImg(url): void {
    const index = this.listImage.indexOf(url);
    const f = this.fileList.filter(item => this.fileList.indexOf(item) !== index);
    this.listImage = this.listImage.filter(x => x !== url);
    this.fileList = f;
  }

  create(): void {
    console.log(this.requestDTO.value);
    console.log(this.selectedWorkerIds);
    const data = _.omitBy(this.requestDTO.value, _.isNil);
    const reportWork = new FormData();
    Object.keys(data).map(key => {
      reportWork.append(key, data[key]);
    });
    if (this.fileList) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.fileList.length; i++) {
        reportWork.append('images', this.fileList[i]);
      }
    }
    // this.bookingCarService.create(bookingCar).subscribe(() => {
    //   this.waitingStoreService.emitData(false);
    //   this.messageStoreService.listeningActionSendMessageNotification({
    //     severity: 'success',
    //     summary: 'Thành công',
    //     detail: 'Đăng ký bán xe thành công. Chúng tôi sẽ gửi đề xuất giá sau khi kiểm định'
    //   });
    //   this.router.navigate(['old-car']);
    // });
  }
}
