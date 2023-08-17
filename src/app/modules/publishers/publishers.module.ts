import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListModule } from './pages/list/list.module';
import { PublishersRoutingModule } from './publishers-routing.module';
import { DetailComponent } from './pages/detail/detail.component';
import { FinishTerritoryComponent } from './pages/detail/components/modals/finish-territory/finish-territory.component';



@NgModule({
  declarations: [
    DetailComponent,
    FinishTerritoryComponent
  ],
  imports: [
    CommonModule,
    ListModule,
    PublishersRoutingModule
  ]
})
export class PublishersModule { }
