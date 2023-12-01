import { Component } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent {

  public displayCount: number = 5;

  public territories: any[] = [
    {
      number: 1,
      publisher: 'David Adan',
      state: 'Asignado',
      img: 'http://grafi-web.com/ciudadlineal/wp-content/uploads/2023/06/territorio-1.png',
      type: 1,
      detail: 'Difícil acceso'
    },
    {
      number: 2,
      publisher: 'Sócrates Crespo',
      state: 'Asignado',
      img: 'http://grafi-web.com/ciudadlineal/wp-content/uploads/2023/06/territorio-2.png',
      type: 2,
      detail: 'Residencial'
    },
    {
      number: 3,
      publisher: 'Joan Mendez',
      state: 'Asignado',
      img: 'http://grafi-web.com/ciudadlineal/wp-content/uploads/2023/06/territorio-3.png',
      type: 3,
      detail: 'Comercial'
    },
  ]

  viewMore(){
    this.displayCount = this.displayCount + 9;
  }

}
