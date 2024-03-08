import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],

})
export class DashboardComponent implements OnInit {

  public sidebarWidth: string = 'sidebar-close';
  public dynamicWidth: number = 10;

  ngOnInit(): void {
    if (window.innerWidth > 991.98) {
      this.dynamicWidth = 15; // Por ejemplo, en dispositivos móviles
    }
  }

  displayMenu(){
    console.log( this.sidebarWidth );
    if( this.sidebarWidth == 'sidebar-close' ){
      
      const interval = setInterval(() => {
        this.dynamicWidth = this.dynamicWidth + 5;
        if( this.dynamicWidth === 75 ){
          clearInterval(interval);
        }
      }, 1); 
      this.sidebarWidth = 'sidebar-open';
    }else{
      const interval = setInterval(() => {
        this.dynamicWidth = this.dynamicWidth - 5;
        if( this.dynamicWidth === 10 ){
          clearInterval(interval);
        }
      }, 1); 
      this.sidebarWidth = 'sidebar-close';
    }
  }

  closeMenu(){
    if (window.innerWidth > 991.98) {
      return;
    }
    const interval = setInterval(() => {
      this.dynamicWidth = this.dynamicWidth - 5;
      if( this.dynamicWidth === 10 ){
        clearInterval(interval);
      }
    }, 1); 
    this.sidebarWidth = 'sidebar-close';
  }

}
