import { Component } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent {

  public publishers: any[] = [
    {
      'id': 1,
      'name': 'David Adan',
      'detail': 'Precursor',
      'territories': '35, 46'
    },
    {
      'id': 2,
      'name': 'Sócrates Crespo',
      'detail': 'Publicador',
      'territories': '169'
    },
    {
      'id': 3,
      'name': 'Joan Mendez',
      'detail': 'Publicador',
      'territories': '78'
    }
  ];

}
