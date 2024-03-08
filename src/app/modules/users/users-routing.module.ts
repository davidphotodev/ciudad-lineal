import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './pages/list/list.component';
import { AddComponent } from './pages/add/add.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component:ListComponent },
      { path: 'add', component:AddComponent },
      { path: '**', redirectTo: '/' }
    ] 
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class UsersRoutingModule { }
