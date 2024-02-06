import { Component, OnInit } from '@angular/core';
import { Territory } from '../../models/territories.interface';
import { TerritoriesService } from '../../services/territories.service';
import { ActivatedRoute } from '@angular/router';
import { Publisher } from 'src/app/modules/publishers/models/publisher.interface';

@Component({
  selector: 'app-assign-territory',
  templateUrl: './assign-territory.component.html',
  styleUrls: ['./assign-territory.component.sass']
})
export class AssignTerritoryComponent implements OnInit {

  public territory!: Territory;
  testPublishers: string[] = [
    'Sócrates',
    'Juan',
    'Fabián',
    'David'
  ];
  

  constructor( private territoriesService: TerritoriesService,
               private activatedRoute: ActivatedRoute
    ){}

  async ngOnInit() {
   this.activatedRoute.params
    .subscribe(
      async ({ id }) => {
        const territoryData = await this.territoriesService.getTerritoryById( id );
        this.territory = territoryData;
      }
    )
  }

  showList( value: string ){
    if( value.length > 2 ){
      alert( value );
    }
  }

}
