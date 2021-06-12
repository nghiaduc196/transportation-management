import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserListComponent} from './user-list/user-list.component';
import {UserUpdateComponent} from './user-update/user-update.component';
import {UserDetailComponent} from './user-detail/user-detail.component';

const routes: Routes = [
    {
        path: '',
        component: UserListComponent,
        data: {
            title: 'Danh sách người dùng'
        }
    },
    {
        path: 'detail/:login',
        component: UserDetailComponent,
        data: {
            title: 'Chi tiết người dùng'
        }
    },
    {
        path: 'update/:login',
        component: UserUpdateComponent,
        data: {
            title: 'Thêm mới người dùng'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule {
}
