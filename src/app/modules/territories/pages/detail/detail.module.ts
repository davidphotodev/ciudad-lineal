import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DetailComponent } from './detail.component';
import { FinishTerritoryComponent } from './components/finish-territory/finish-territory.component';



@NgModule({
  declarations: [
    DetailComponent,
    FinishTerritoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class DetailModule { }
