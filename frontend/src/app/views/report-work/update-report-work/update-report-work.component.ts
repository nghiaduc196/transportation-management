import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {UserService} from '../../../core/services/user.service';
import * as _ from 'lodash';
import {ReportWorkService} from '../../../core/services/report-work.service';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {AccountService} from '../../../core/services/account.service';

@Component({
  selector: 'app-update-report-work',
  templateUrl: './update-report-work.component.html',
  styleUrls: ['./update-report-work.component.scss'],
  providers: [MessageService]
})
export class UpdateReportWorkComponent implements OnInit {
  requestDTO = this.fb.group({
    id: [null],
    nameCustomer: [null, Validators.required],
    phoneCustomer: [null, Validators.required],
    addressStart: [null, Validators.required],
    addressEnd: [null, Validators.required],
    description: [null, Validators.required],
    totalMoney: [null, Validators.required],
    licensePlate: [null, Validators.required],
    workersDetailRequestDTOS: [null, Validators.required]
  });
  listOldImage = [];
  listImage = [];
  fileList = [];
  isPickedImage = false;
  listWorkers = [];
  selectedWorkerIds = [];
  constructor(private fb: FormBuilder, private userService: UserService,
              private reportWorkService: ReportWorkService,
              private router: Router,
              private messageService: MessageService,
              private accountService: AccountService) {
    this.accountService.identity().then(account => {
      console.log(account);
      this.selectedWorkerIds.push(account.id);
    });
  }

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
    // const reportWorkersDetailRequestDTO = [];
    // for (let i = 0; i < this.selectedWorkerIds.length; i++) {
    //   const param = {
    //     userId: this.selectedWorkerIds[i]
    //   };
    //   reportWorkersDetailRequestDTO.push(param);
    // }
    this.requestDTO.controls.workersDetailRequestDTOS.setValue(this.selectedWorkerIds);
    const data = _.omitBy(this.requestDTO.value, _.isNil);
    console.log(data);
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
    this.reportWorkService.create(reportWork).subscribe(() => {
      this.messageService.add({severity: 'success', summary: 'Thành công', detail: 'Tạo mới thành công'});
      this.router.navigate(['report-work/list']);
    });
  }
}
