import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../core/services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';
import {PositionService} from '../../../core/services/position.service';
import * as _ from 'lodash';
import {MessageService} from 'primeng/api';

@Component({
    selector: 'app-user-update',
    templateUrl: './user-update.component.html',
    styleUrls: ['./user-update.component.scss'],
    providers: [MessageService]
})
export class UserUpdateComponent implements OnInit {
  user: any;
  requestDTO = this.fb.group({
    id: [null],
    login: ['', Validators.required],
    password: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    activated: [true],
    positionId: [null],
    authorities: [null]
  });
  authoritiesSelected = [];
  authorities = [];
  totalRecords = 0;
  pageSize = 10;
  loading = false;
  page = 0;
  groupFilter = new FormControl('');
  positions = [];

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private positionService: PositionService,
              private messageService: MessageService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getListAuthorities();
    this.getListPositions();
    this.getDetailUser();
    this.groupFilter.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => (this.loading = true)),
        tap(() => this.getListAuthorities())
      ).subscribe();
  }

  getDetailUser() {
    this.route.data.subscribe(({ user }) => {
      if (user) {
        this.requestDTO.controls.login.setValue(user.login);
        // this.requestDTO.controls.password.setValue(user.)
        // this.requestDTO.controls.positionId.setValue(user.)
        this.requestDTO.controls.authorities.setValue(user.authorities);
        this.authoritiesSelected = user.authorities;
        console.log(user);
      }
    });
  }

  getListAuthorities() {
    const param = {
      name: this.groupFilter.value,
      page: this.page,
      size: this.pageSize
    };
    this.userService.getAuthorities(param).subscribe(res => {
      this.onSuccess(res.body, res.headers);
    });
  }

  getListPositions() {
    const param = {
      page: this.page,
      size: 1000
    };
    this.positionService.getListActive(param).subscribe(res => {
      this.positions = res.body;
    });
  }

  private onSuccess(data, headers) {
    this.loading = false;
    this.totalRecords = headers.get('X-Total-Count');
    this.authorities = data;
  }

  inSelected(authority) {
    return this.authoritiesSelected.map(a => a.name).indexOf(authority.name) > -1;
  }

  choose(authority) {
    this.authoritiesSelected.push(authority);
  }

  unChoose(authority) {
    this.authoritiesSelected = this.authoritiesSelected.filter(a => a.name !== authority.name);
  }

  create() {
    this.requestDTO.controls.authorities.setValue(this.authoritiesSelected);
    const data = _.omitBy(this.requestDTO.value, _.isNil);
    if (this.user) {
      this.userService.update(data).subscribe(
        () => this.onSaveSuccess(),
        () => this.onSaveError()
      );
    } else {
      this.userService.create(data).subscribe(
        () => this.onSaveSuccess(),
        () => this.onSaveError()
      );
    }
  }

  onSaveSuccess() {
    this.messageService.add({severity: 'success', summary: 'Thành công', detail: 'Tạo mới thành công'});
    this.router.navigate(['user/list']);
  }

  onSaveError() {
    this.messageService.add({severity: 'error', summary: 'Lỗi', detail: 'Hệ thống lỗi. Vui lòng thử lại sau'});
  }
}
