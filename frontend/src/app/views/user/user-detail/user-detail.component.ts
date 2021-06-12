import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../core/services/user.service';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
    login: any;
    userData: any;
    address: any;

    constructor(
        private route: ActivatedRoute,
        private userService: UserService
    ) {
    }

    ngOnInit(): void {
        this.login = this.route.snapshot.paramMap.get('login');
        this.getUserByLogin();
    }

    getUserByLogin() {
        this.userService.getUserByLogin(this.login).subscribe(res => {
            this.userData = res.body;
            if (this.userData?.district?.name === null && this.userData?.province?.name === null) {
              this.address = null;
            } else {
              if (this.userData?.district?.name !== undefined) {
                this.address = this.userData?.district?.name + '-' + this.userData?.province?.name;
              }
            }
            console.log('user data: ', this.userData);
        });
    }
}
