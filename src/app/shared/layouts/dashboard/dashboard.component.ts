import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ]
})
export class DashboardComponent {

  public sidebarWidth: string = 'sidebar-close';

  displayMenu(){
    console.log( this.sidebarWidth );
    if( this.sidebarWidth == 'sidebar-close' ){
      this.sidebarWidth = 'sidebar-open';
    }else{
      this.sidebarWidth = 'sidebar-close';
    }
  }

}
