import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PositionComponent } from './position.component';
import {PositionRoutingModule} from './position-routing.module';

@NgModule({
  declarations: [
    PositionComponent
  ],
  imports: [
    CommonModule,
    PositionRoutingModule
  ]
})
export class PositionModule { }
