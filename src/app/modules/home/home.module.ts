import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './pages/main/main.component';
import { HomeRoutingModule } from './home-routing.module';
import { MainInfoComponent } from './pages/main/components/main-info/main-info.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    MainComponent,
    MainInfoComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    RouterModule
  ]
})
export class HomeModule { }
