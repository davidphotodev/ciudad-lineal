import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListModule } from './pages/list/list.module';
import { TerritoriesRoutingModule } from './territories-routing.module';
import { DetailComponent } from './pages/detail/detail.component';
import { FinishTerritoryComponent } from './pages/detail/components/finish-territory/finish-territory.component';
import { AddTerritoryComponent } from './components/add-territory/add-territory.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FirestoreModule } from '@angular/fire/firestore';



@NgModule({
  declarations: [
    DetailComponent,
    FinishTerritoryComponent,
    AddTerritoryComponent
  ],
  imports: [
    CommonModule,
    ListModule,
    TerritoriesRoutingModule,
    ReactiveFormsModule,
    FirestoreModule
  ]
})
export class TerritoriesModule { }
