import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {UserService} from '../../../core/services/user.service';
import * as _ from 'lodash';
import * as moment from 'moment';
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
    phoneCustomer: [null, [Validators.required, Validators.pattern(/^\d{10}$|^\d{11}$/)]],
    addressStart: [null, Validators.required],
    addressEnd: [null, Validators.required],
    description: [null, Validators.required],
    totalMoney: [null, Validators.required],
    licensePlate: [null, Validators.required],
    implementationDate: [null, Validators.required],
    workersDetailRequestDTOS: [null, Validators.required]
  });
  listOldImage = [];
  listImage = [];
  fileList = [];
  isPickedImage = false;
  listWorkers = [];
  selectedWorkerIds = [];
  pickTime = new FormControl(null);
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
    const timeCreate = moment(this.pickTime.value).format('yyyy-MM-DD');
    this.requestDTO.controls.implementationDate.setValue(timeCreate);
    this.requestDTO.controls.workersDetailRequestDTOS.setValue(this.selectedWorkerIds);
    if (!this.requestDTO.valid) {
      this.messageService.add({severity: 'warn', summary: 'Cảnh báo', detail: 'Vui lòng nhập hết các thông tin'});
    } else {
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
}
