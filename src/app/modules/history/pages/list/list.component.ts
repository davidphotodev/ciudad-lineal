import { Component, OnDestroy, OnInit } from '@angular/core';
import { HistoryService } from '../../services/history.service';
import { History } from '../../models/history.interface';
import { Observable, Subject, map, takeUntil } from 'rxjs';

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
    .pipe(
      takeUntil(this.destroyObs$),
      map(history => {
        return history.sort((a, b) => {
          if (a.last_date && b.last_date) {
            return new Date(b.last_date).getTime() - new Date(a.last_date).getTime();
          } else {
            return -1; 
          }
        });
      })
    )
    .subscribe(sortedHistory => {
      this.history = sortedHistory;
    });
  }

  ngOnDestroy() {
    this.destroyObs$.next();
    this.destroyObs$.complete();
  }

}
