import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
export class FinishTerritoryComponent implements OnInit {
  @Output()
  public childEvent = new EventEmitter<string>();

  // Getting parents values
  @Input()
  public territory!: Territory;

  @Input()
  public publisher!: Publisher;

  @Input()
  public idPublisher!: string;

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
    if( this.idPublisher ){
      const publish = await this.publishersService.getPublisherById( this.idPublisher );
      this.publisher = publish;
    }
    if( this.publisher ){
      this.publisher.id = this.idPublisher;
    }
  }

  async finish( publisher: Publisher, territory: Territory, date_end: string  ){
    if( publisher.id && territory.id ){
      await this.territoriesService.finishTerritory(publisher.id, territory.id, publisher, territory, date_end);
      this.childEvent.emit('d-none');
      console.log('Territorio terminado');
      this.router.navigate(['/admin/territories']);
    }
  }
  
  hideModal(){
    this.childEvent.emit('d-none');
  }
}
