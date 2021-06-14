import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {LoginService} from '../../core/services/login.service';
import {Router} from '@angular/router';
import {StateStorageService} from '../../core/services/state-storage.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  providers: [MessageService]

})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  authenticationError = false;

  constructor(private fb: FormBuilder,
              private loginService: LoginService,
              private router: Router,
              private stateStorageService: StateStorageService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
  }

  loginSubmit(): any {
    if (this.loginForm.controls.username.valid && this.loginForm.controls.password.valid) {
      this.loginService
        .login(this.loginForm.getRawValue())
        .then(() => {
          this.authenticationError = false;
          this.router.navigate(['']);
          const redirect = this.stateStorageService.getUrl();
          this.messageService.add({severity: 'success', summary: 'Thành công', detail: 'Đăng nhập thành công'});
          if (redirect) {
            this.stateStorageService.storeUrl(null);
            this.router.navigate([redirect]);
          }
        })
        .catch(() => {
          this.messageService.add({severity: 'error', summary: 'Lỗi', detail: 'Tài khoản không đúng. Vui lòng nhập lại'});
          this.loginForm.reset();
          // if (window.innerWidth <= phoneSize) {
          this.authenticationError = true;
        });
    }
  }
}
