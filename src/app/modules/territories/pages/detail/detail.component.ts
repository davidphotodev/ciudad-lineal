import { Component, OnInit } from '@angular/core';
import { TerritoriesService } from '../../services/territories.service';
import { ActivatedRoute } from '@angular/router';
import { Territory } from '../../models/territories.interface';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.sass']
})
export class DetailComponent implements OnInit {
  
  public finishModalClass: string = 'd-none';
  public deleteModalClass: string = 'd-none';
  public whatsappNumber: string = '604216037';
  public territory!: Territory;
  public lastDate!: string;

  constructor( private territoriesService: TerritoriesService,
               private activatedRoute: ActivatedRoute ){}
  
  
  async ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        async ({ id }) => {
          const territoryData = await this.territoriesService.getTerritoryById( id );
          if( territoryData ){
            this.territory = territoryData;
            this.territory.id = id;
          }
        }
      );
  }

  assignTerritory( id: string ){

  }

  hideModal( value: string ){
    this.finishModalClass = value;
  }

  hideDeleteModal( value: string ){
    this.deleteModalClass = value;
  }

}
