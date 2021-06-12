import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../core/services/account.service';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  account: any;

  constructor(private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.getAccount();
  }

  getAccount(): any {
    this.accountService.identity().then(account => {
      this.account = account;
      console.log('data tra ve: ', this.account);
      // this.checkAccountLogin(account);
    });
  }
}
