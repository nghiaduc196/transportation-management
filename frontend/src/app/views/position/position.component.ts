import { Component, OnInit } from '@angular/core';
import {PositionService} from '../../core/services/position.service';
import {FormBuilder, Validators} from '@angular/forms';
import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';
import * as _ from 'lodash';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss'],
  providers: [MessageService, ConfirmationService]

})
export class PositionComponent implements OnInit {
  sortedData = [];
  pageSizeOption = [5, 10, 20];
  totalData: any;
  pageSize = 10;
  pageIndex = 0;
  dialogCreate = false;
  type: any;
  requestDTO = this.fb.group({
    id: [null],
    name: [null, Validators.required],
    status: [null]
  });
  dialogDelete = false;
  constructor(private positionService: PositionService,
              private fb: FormBuilder,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.fetch();
  }

  paginate(event): any {
    this.pageSize = event.rows;
    this.pageIndex = event.page;
    this.fetch();
  }

  fetch() {
    const param  = {
      size: this.pageSize,
      page: this.pageIndex,
    };
    this.positionService.getAll(param).subscribe(res => {
      this.sortedData = res.body;
      this.totalData = res.headers.get('X-Total-Count');
    });
  }

  openDialog(data) {
    this.dialogCreate = true;
    this.type = data;
  }

  create() {
    if (this.requestDTO.valid) {
      const data = _.omitBy(this.requestDTO.value, _.isNil);
      if (this.type === 'CREATE') {
        this.positionService.create(data).subscribe(res => {
          this.messageService.add({severity: 'success', summary: 'Thành công', detail: 'Tạo mới thành công'});
          this.fetch();
          this.dialogCreate = false;
          this.requestDTO.reset();
        }, err => {
          if (err.error.errorKey === 'duplicate' ) {
            this.messageService.add({severity: 'info', summary: 'Thông báo', detail: 'Vị trí này đã được tạo'});
          } else {
            this.messageService.add({severity: 'error', summary: 'Lỗi', detail: 'Hệ thống lỗi. Vui lòng thử lại sau'});
          }
          this.requestDTO.reset();
        });
      } else {
        this.positionService.update(data).subscribe(() => {
          this.messageService.add({severity: 'success', summary: 'Thành công', detail: 'Cập nhật thành công'});
          this.fetch();
          this.dialogCreate = false;
          this.requestDTO.reset();
        }, err => {
          if (err.error.errorKey === 'duplicate' ) {
            this.messageService.add({severity: 'info', summary: 'Thông báo', detail: 'Vị trí này đã được tạo'});
          } else {
            this.messageService.add({severity: 'error', summary: 'Lỗi', detail: 'Hệ thống lỗi. Vui lòng thử lại sau'});
          }
          this.requestDTO.reset();
        });
      }
    } else {
      this.messageService.add({severity: 'info', summary: 'Thông báo', detail: 'Vui lòng nhập tên vị trí'});
    }
  }

  openEdit(data) {
    this.requestDTO.controls.id.setValue(data.id);
    this.requestDTO.controls.name.setValue(data.name);
    this.requestDTO.controls.status.setValue(data.status);
    this.type = 'UPDATE';
    this.dialogCreate = true;
  }

  close() {
    this.dialogCreate = false;
    this.requestDTO.reset();
  }

  delete(data) {
    this.confirmationService.confirm({
      message: 'Bạn muốn xóa vị trí ' + data.name + ' ?' ,
      header: 'Xóa' ,
      icon: 'pi pi-info-circle',
      accept: () => {
        this.positionService.delete(data.id).subscribe(res => {
          this.messageService.add({severity: 'success', summary: 'Thành công', detail: 'Xóa thành công'});
          this.fetch();
        }, err => {
          this.messageService.add({severity: 'error', summary: 'Lỗi', detail: 'Hệ thống lỗi. Vui lòng thử lại sau'});
        });
      },
      reject: (type) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            break;
          case ConfirmEventType.CANCEL:
            break;
        }
      }
    });
  }

  changeStatus(data: any, status: any) {
    let text = '';
    if (status === 'ENABLE') {
      text = 'Kích hoạt vị trí';
    } else {
      text = 'Tắt vị trí';
    }
    this.requestDTO.controls.id.setValue(data.id);
    this.requestDTO.controls.status.setValue(status);
    this.confirmationService.confirm({
      message: 'Bạn muốn thay đổi trạng thái vị trí ' + data.name + ' ?' ,
      header: text ,
      icon: 'pi pi-info-circle',
      accept: () => {
        this.positionService.changeStatus(this.requestDTO.value).subscribe(res => {
          data.status = 'DISABLE';
          this.messageService.add({severity: 'success', summary: 'Thành công', detail: 'Thay đổi thành công'});
          this.fetch();
        }, err => {
          this.messageService.add({severity: 'error', summary: 'Lỗi', detail: 'Hệ thống lỗi. Vui lòng thử lại sau'});
        });
      },
      reject: (type) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            break;
          case ConfirmEventType.CANCEL:
            break;
        }
      }
    });
  }

}
