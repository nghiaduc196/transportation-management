import {Injectable, NgModule} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterModule, Routes} from '@angular/router';
import {UserListComponent} from './user-list/user-list.component';
import {UserUpdateComponent} from './user-update/user-update.component';
import {UserService} from '../../core/services/user.service';
import {Observable, of} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserManagementResolve implements Resolve<any> {
  user: any;
  constructor(private service: UserService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const id = route.params['login'];
    if (id) {
      return this.service.find(id);
    }
    return this.user();
  }
}

const routes: Routes = [
  {
    path: 'list',
    component: UserListComponent,
    data: {
      title: 'Danh sách người dùng'
    }
  },
  {
    path: 'create',
    component: UserUpdateComponent,
    data: {
      title: 'Thêm mới người dùng'
    }
  },
  {
    path: 'update/:login',
    component: UserUpdateComponent,
    resolve: {
      user: UserManagementResolve,
    },
    data: {
      title: 'Cập nhật thông tin người dùng'
    }
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule {
}
