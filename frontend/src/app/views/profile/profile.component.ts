import {Component, OnInit} from '@angular/core';
import {UserService} from '../../core/services/user.service';
import {AccountService} from '../../core/services/account.service';

@Component({
    selector: 'app-user-detail',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  account: any;
  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.accountService.identity(false).then((account) => {
      this.account = account;
    });
  }
}
