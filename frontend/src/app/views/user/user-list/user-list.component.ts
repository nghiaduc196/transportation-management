import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {UserService} from '../../../core/services/user.service';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss'],
    providers: [MessageService, ConfirmationService]
})
export class UserListComponent implements OnInit {
  sortedData: any;
  totalData: any;
  pageSize = 10;
  pageIndex = 0;
  sortDesc = true;
  pageSizeOption = [5, 10, 20];
  display = false;
  user: any;
  widthScreen: any;
  maxWidth = 991;
  constructor(private userService: UserService,
              private router: Router,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) {}

  ngOnInit(): void {
    this.filterUser();
    this.widthScreen = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  }

  filterUser(sort ?): any {
    const param = {
      size: this.pageSize,
      page: this.pageIndex,
    };
    this.userService.filterUser(param).subscribe(res => {
      this.sortedData = res.body;
      this.totalData = res.headers.get('X-Total-Count');
    });
  }

  paginate(event): any {
    this.pageSize = event.rows;
    this.pageIndex = event.page;
    this.filterUser();
  }

  sortByDate(): any {
    this.sortDesc = !this.sortDesc;
    // this.filterUser(this.sortDesc ? 'desc' : 'asc');
  }

  gotoDetail(login?): void {
    this.router.navigate(['user/detail', login]);
  }

  routerPage(login?): void {
    this.router.navigate(['report-work', login, 'list']);

  }

  updateEnable(data?) {
    const body = {
      id: data.id,
      activated: true
    };
    this.confirmationService.confirm({
      message: 'Bạn muốn kích hoạt cho tài khoản #' + data.login + ' ?',
      header: 'Cập nhật' ,
      icon: 'pi pi-info-circle',
      accept: () => {
        this.userService.updateStatus(body).subscribe(res => {
          this.messageService.add({severity: 'success', summary: 'Thành công', detail: 'Kích hoạt thành công'});
          data.activated = true;
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

  updateDisable(data?) {
    const body = {
      id: data.id,
      activated: false
    };
    this.confirmationService.confirm({
      message: 'Bạn muốn hủy hoạt động của tài khoản #' + data.login + ' ?',
      header: 'Cập nhật' ,
      icon: 'pi pi-info-circle',
      accept: () => {
        this.userService.updateStatus(body).subscribe(res => {
          this.messageService.add({severity: 'success', summary: 'Thành công', detail: 'Hủy hoạt động thành công'});
          data.activated = false;
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

  openDialog(user) {
    this.display = true;
    this.user = user;
  }

}
