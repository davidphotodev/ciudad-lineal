import { Component, OnInit } from '@angular/core';
import { DatesService } from 'src/app/core/services/dates.service';
import { PublishersService } from 'src/app/modules/publishers/services/publishers.service';
import { TerritoriesService } from 'src/app/modules/territories/services/territories.service';

@Component({
  selector: 'app-main-info',
  templateUrl: './main-info.component.html',
  styleUrls: ['./main-info.component.sass']
})
export class MainInfoComponent implements OnInit {

  public publishers: number = 0;
  public assigned: number = 0;
  public available: number = 0;
  public finished: number = 0;

  constructor( private publishersService: PublishersService,
               private territoriesService:TerritoriesService,
               private dates: DatesService ){}

  ngOnInit() {
    this.publishersService.getPublishers()
        .subscribe(
          publishers => this.publishers = publishers.length
        );

    this.territoriesService.getTerritories()
        .subscribe(
          territories => {
            this.assigned = territories.filter( territory => territory.state === 'Assigned' ).length;
            this.available = territories.filter( territory => territory.state === 'Not assigned' && this.lastDate(Number(territory.last_date)) >= 3 ).length;
            this.finished = territories.filter( territory => territory.state === 'Not assigned' && this.lastDate(Number(territory.last_date)) < 3 ).length;
          }
        );
  }

  lastDate( date: number ){
    if( date < 1 ) return 0;
    return this.dates.dateToExpire( date );
  }

}
