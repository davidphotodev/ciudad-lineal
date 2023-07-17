import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then( m => m.HomeModule )
  },
  {
    path: 'publishers',
    loadChildren: () => import('./modules/publishers/publishers.module').then( m => m.PublishersModule )
  },
  {
    path: 'territories',
    loadChildren: () => import('./modules/territories/territories.module').then( m => m.TerritoriesModule )
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
