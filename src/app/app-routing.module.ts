import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './shared/layouts/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'admin',
    component: DashboardComponent,
    children: [
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
      /* {
        path: '**',
        redirectTo: '/'
      } */
    ]
  },
  {
    path: 'auth',
    loadChildren: () => import('./core/authentication/auth.module').then( m => m.AuthModule )
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
