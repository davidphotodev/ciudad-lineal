import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListModule } from './pages/list/list.module';
import { TerritoriesRoutingModule } from './territories-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ListModule,
    TerritoriesRoutingModule
  ]
})
export class TerritoriesModule { }
