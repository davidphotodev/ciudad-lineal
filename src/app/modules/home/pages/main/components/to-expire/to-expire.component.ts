import { Component, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Subject, takeUntil } from 'rxjs';
import { Territory } from 'src/app/modules/territories/models/territories.interface';
import { TerritoriesService } from 'src/app/modules/territories/services/territories.service';

@Component({
  selector: 'app-to-expire',
  templateUrl: './to-expire.component.html',
  styleUrls: ['./to-expire.component.sass']
})
export class ToExpireComponent implements OnInit, OnDestroy {

  public territories!: Territory[];
  public alert: string = '';
  destroyObs$: Subject<void> = new Subject();

  constructor( private territoriesService: TerritoriesService ){}

  ngOnInit(): void {
    this.territoriesService.getTerritories()
      .pipe( takeUntil( this.destroyObs$ ) )
      .subscribe(
        territories => { 
           this.territories = territories
            .filter( territory => territory.state == 'Assigned' && this.dateToExpire( territory.last_date ) > 0 )
            .sort((a,b) => a.last_date - b.last_date);
        }
      );
  }

  ngOnDestroy(): void {
    this.destroyObs$.next();
    this.destroyObs$.complete();
  }

  dateToExpire( last_date: number ){
    const formatDate = last_date.toString();
    const expDAte = moment(formatDate, 'YYYYMMDD').fromNow();
    
    if( expDAte.substring(0,1) === 'a' ){
      return 1;
    }

    if( expDAte.includes('days') ){
      return 0.5;
    }

    return Number(expDAte.substring(0,1));
  }

}
