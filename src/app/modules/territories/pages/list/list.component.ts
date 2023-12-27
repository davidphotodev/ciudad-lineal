import { Component, OnInit } from '@angular/core';
import { TerritoriesService } from '../../services/territories.service';
import { Territory } from '../../models/territories.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {

  public displayCount: number = 5;
  public territories: Territory[] = [
    {
      number: 1,
      description: '',
      history: [],
      type: '',
      map: '',
      publisher: '',
      state: '',
      last_date: ''
    }
  ]

  constructor( private territoriesService: TerritoriesService ){}

  ngOnInit(): void {
    this.territoriesService.getTerritories()
      .subscribe(
        territories => {
          console.log(territories);
          this.territories = territories;
        })
  }

  viewMore(){
    this.displayCount = this.displayCount + 9;
  }

}
