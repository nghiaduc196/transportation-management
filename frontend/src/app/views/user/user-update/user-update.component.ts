import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../core/services/user.service';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';

@Component({
    selector: 'app-user-update',
    templateUrl: './user-update.component.html',
    styleUrls: ['./user-update.component.scss'],
})
export class UserUpdateComponent implements OnInit {
  user: any;
  requestDTO = this.fb.group({
    id: [''],
    login: ['', Validators.required],
    password: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    activated: [''],
    positionId: [null]
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
              private fb: FormBuilder) {}

    ngOnInit(): void {
      this.getListAuthorities();
      this.groupFilter.valueChanges
        .pipe(
          debounceTime(200),
          distinctUntilChanged(),
          tap(() => (this.loading = true)),
          tap(() => this.getListAuthorities())
        ).subscribe();
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

  private onSuccess(data, headers) {
    this.loading = false;
    this.totalRecords = headers.get('X-Total-Count');
    this.authorities = data;
  }

  inSelected(authority) {
    return this.authoritiesSelected.map(p => p.name).indexOf(authority.name) > -1;
  }

  choose(authority) {
    this.authoritiesSelected.push(authority);
  }

  unChoose(authority) {
    this.authoritiesSelected = this.authoritiesSelected.filter(p => p.name !== authority.name);
  }
}
