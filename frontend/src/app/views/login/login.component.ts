import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {LoginService} from '../../core/services/login.service';
import {Router} from '@angular/router';
import {StateStorageService} from '../../core/services/state-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit{
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  authenticationError = false;

  constructor(private fb: FormBuilder,
              private loginService: LoginService,
              private router: Router,
              private stateStorageService: StateStorageService,) {
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
          if (redirect) {
            this.stateStorageService.storeUrl(null);
            this.router.navigate([redirect]);
          }
        })
        .catch(() => {
          this.loginForm.reset();
          // if (window.innerWidth <= phoneSize) {
          this.authenticationError = true;
        });
    }
  }
}
