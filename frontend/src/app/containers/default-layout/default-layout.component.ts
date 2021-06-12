import {Component, OnInit} from '@angular/core';
import { navItems } from '../../_nav';
import {AccountService} from '../../core/services/account.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public navItems = navItems;
  account: any;
  constructor(private accountService: AccountService) {
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
}
