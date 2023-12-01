import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListModule } from './pages/list/list.module';
import { TerritoriesRoutingModule } from './territories-routing.module';
import { DetailComponent } from './pages/detail/detail.component';
import { FinishTerritoryComponent } from './pages/detail/components/finish-territory/finish-territory.component';



@NgModule({
  declarations: [
    DetailComponent,
    FinishTerritoryComponent
  ],
  imports: [
    CommonModule,
    ListModule,
    TerritoriesRoutingModule
  ]
})
export class TerritoriesModule { }
