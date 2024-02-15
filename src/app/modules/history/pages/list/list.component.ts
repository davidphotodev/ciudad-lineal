import { Component, OnDestroy, OnInit } from '@angular/core';
import { HistoryService } from '../../services/history.service';
import { History } from '../../models/history.interface';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit, OnDestroy {

  public history: History[] = [];
  public destroyObs$: Subject<void> = new Subject();
  

  constructor( private historyService: HistoryService ){}

  ngOnInit(): void{
    this.historyService.getHistory()
      .pipe( takeUntil( this.destroyObs$ ) )
      .subscribe(
        history => {
          this.history = history;
        }
      )
  }

  ngOnDestroy() {
    this.destroyObs$.next();
    this.destroyObs$.complete();
  }

}
