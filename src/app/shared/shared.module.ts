import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { ManageModule } from '../modules/manage/manage.module';
import { SearchMenuComponent } from './layouts/dashboard/components/search-menu/search-menu.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    SearchMenuComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    ManageModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class SharedModule { }
