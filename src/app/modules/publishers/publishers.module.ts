import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListModule } from './pages/list/list.module';
import { PublishersRoutingModule } from './publishers-routing.module';
import { DetailComponent } from './pages/detail/detail.component';



@NgModule({
  declarations: [
    DetailComponent
  ],
  imports: [
    CommonModule,
    ListModule,
    PublishersRoutingModule
  ]
})
export class PublishersModule { }
