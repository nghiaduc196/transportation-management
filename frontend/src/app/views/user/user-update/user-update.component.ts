import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../core/services/user.service';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {Location} from '@angular/common';

@Component({
    selector: 'app-user-update',
    templateUrl: './user-update.component.html',
    styleUrls: ['./user-update.component.scss'],
})
export class UserUpdateComponent implements OnInit {
    dataUser: any;
    rawGroup: any;
    editedGroup: any;
    checked = false;
    alreadyPro = false;
    userForm = this.fb.group({
        id: '',
        login: '',
        activated: [null, Validators.requiredTrue]
    });

    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private _location: Location) {
    }

    ngOnInit(): void {
        const login = this.route.snapshot.paramMap.get('login');
        console.log(login);
        this.getUserUpdate(login);
    }

    getUserUpdate(login?) {
        this.userService.getUserByLogin(login).subscribe(res => {
            this.dataUser = res.body;
            console.log('getUserUpdate', this.dataUser);
            this.userForm.controls['activated'].setValue(res.body.activated);
            this.userForm.controls['id'].setValue(res.body.id);
            this.userForm.controls['login'].setValue(res.body.login);
            if (res.body.authorities[0] === 'ROLE_PRO') {
              this.alreadyPro = true;
            }
            console.log('Form:', this.userForm.getRawValue());
        });
    }

    saveUser(): void {
        console.log('update user: ');
        console.log('Form update:', this.userForm.getRawValue());
        this.userService.updateUser(this.userForm.getRawValue()).subscribe(res => {
            console.log(res);
            this.backToPrevious();
        });
    }

    fake(item: any): void {
      console.log(item.checked);
      console.log(this.userForm.controls.activated.value);
    }

    backToPrevious(): void {
        this._location.back();
    }

    updatePro(): void {
      this.userService.updatePro(this.userForm.controls.id.value).subscribe(() => {});
      this.alreadyPro = true;
    }

    updateNormal(): void {
      this.userService.updateNormal(this.userForm.controls.id.value).subscribe(() => {
      });
      this.alreadyPro = false;
    }
}
