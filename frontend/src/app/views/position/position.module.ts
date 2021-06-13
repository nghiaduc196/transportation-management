import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PositionComponent } from './position.component';
import {PositionRoutingModule} from './position-routing.module';
import {PaginatorModule} from 'primeng/paginator';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {RippleModule} from 'primeng/ripple';
import {ReactiveFormsModule} from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

@NgModule({
  declarations: [
    PositionComponent
  ],
  imports: [
    CommonModule,
    PositionRoutingModule,
    PaginatorModule,
    NgbDropdownModule,
    DialogModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    ReactiveFormsModule,
    ToastModule,
    ConfirmDialogModule
  ]
})
export class PositionModule { }
