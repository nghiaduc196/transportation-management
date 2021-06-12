import {Component, OnInit} from '@angular/core';
import { navItems } from '../../_nav';
import {AccountService} from '../../core/services/account.service';
import {LoginService} from '../../core/services/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public navItems = navItems;
  account: any;
  constructor(private accountService: AccountService,
              private loginService: LoginService,
              private router: Router) {
  }
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  ngOnInit(): void {
    this.accountService.identity(true).then((account: Account) => {
      this.account = account;
      this.navItems = navItems
        .filter(value => value.authorities == null || this.accountService.hasAnyAuthority(value.authorities))
        .map(menu => {
          if (menu.children != null) {
            menu.children = menu.children.filter(value2 => {
              return value2.authorities == null || this.accountService.hasAnyAuthority(value2.authorities);
            });
          }
          return menu;
        });
    });
  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }

  getImageUrl() {
    return this.isAuthenticated() ? this.accountService.getImageUrl() : null;
  }

  logout() {
    this.loginService.logout(true);
    this.router.navigate(['/login']);
  }
}
