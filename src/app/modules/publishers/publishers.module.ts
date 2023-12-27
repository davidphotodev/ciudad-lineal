import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListModule } from './pages/list/list.module';
import { PublishersRoutingModule } from './publishers-routing.module';
import { DetailComponent } from './pages/detail/detail.component';
import { FinishTerritoryComponent } from './pages/detail/components/modals/finish-territory/finish-territory.component';
import { AddPublisherComponent } from './components/add-publisher/add-publisher.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DetailComponent,
    FinishTerritoryComponent,
    AddPublisherComponent
  ],
  imports: [
    CommonModule,
    ListModule,
    PublishersRoutingModule,
    ReactiveFormsModule
  ]
})
export class PublishersModule { }
