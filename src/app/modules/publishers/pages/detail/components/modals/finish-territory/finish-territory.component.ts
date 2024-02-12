import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Publisher } from 'src/app/modules/publishers/models/publisher.interface';
import { PublishersService } from 'src/app/modules/publishers/services/publishers.service';
import { Territory } from 'src/app/modules/territories/models/territories.interface';
import { TerritoriesService } from 'src/app/modules/territories/services/territories.service';

@Component({
  selector: 'app-finish-territory',
  templateUrl: './finish-territory.component.html',
  styleUrls: ['./finish-territory.component.sass']
})
export class FinishTerritoryComponent {
  
  @Output()
  public childEvent = new EventEmitter<string>();

  // Getting parents values
  @Input()
  public territory!: Territory;

  @Input()
  public publisher!: Publisher;

  formattedDate: string;

  constructor( private territoriesService: TerritoriesService,
               private publishersService: PublishersService,
               private router: Router ){
    // Get and formatting end date
    const currentDate: Date = new Date();

    const day: number = currentDate.getDate();
    const month: number = currentDate.getMonth() + 1;
    const year: number = currentDate.getFullYear();

    const formattedDay: string = (day < 10) ? '0' + day : day.toString();
    const formattedMonth: string = (month < 10) ? '0' + month : month.toString();

    this.formattedDate = formattedDay + '-' + formattedMonth + '-' + year;
  }

  async ngOnInit() {
    if( this.publisher.id ){
      const publish = await this.publishersService.getPublisherById( this.publisher.id );
      this.publisher = publish;
    }
  }

  finish( publisher: Publisher, territory: Territory, date_end: string  ){
    this.territoriesService.finishTerritory('sgregrsgrs', 'gaegeagegd', publisher, territory, date_end);
    this.childEvent.emit('d-none');
    this.router.navigate(['/admin/publishers/detail', publisher.id]);
    console.log('Territorio terminado');
  }

  hideModal(){
    this.childEvent.emit('d-none');
  }

}
