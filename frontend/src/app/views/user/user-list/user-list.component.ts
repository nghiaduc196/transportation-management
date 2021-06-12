import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {UserService} from '../../../core/services/user.service';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
    sortedData: any;
    totalData: any;
    pageSize = 10;
    pageIndex = 0;
    sortDesc = true;
    pageSizeOption = [5, 10, 20];
    userForm = this.fb.group({
      id: '',
      login: '',
      activated: [null, Validators.requiredTrue]
    });

    constructor(
        private userService: UserService,
        private router: Router,
        private fb: FormBuilder
    ) {
    }

    ngOnInit(): void {
        this.filterUser();
    }

    update(): any {
    }

    delete(): any {
    }

    filterUser(sort ?): any {
        const param = {
            size: this.pageSize,
            page: this.pageIndex,
        };
        this.userService.filterUser(param).subscribe(res => {
            this.sortedData = res.body;
            console.log(this.sortedData);
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

  acceptAuction(item: any): void {
    console.log(item);
  }

}
