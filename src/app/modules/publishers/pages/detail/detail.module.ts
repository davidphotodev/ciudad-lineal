import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail.component';
import { RouterModule } from '@angular/router';
import { FinishTerritoryComponent } from './components/modals/finish-territory/finish-territory.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DetailComponent,
    FinishTerritoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class DetailModule { }
