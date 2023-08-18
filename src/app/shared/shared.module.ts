import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { ManageModule } from '../modules/manage/manage.module';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ManageModule,
    DashboardComponent,
  ],
  exports: [
    DashboardComponent
  ]
})
export class SharedModule { }
