import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { Publisher } from 'src/app/modules/publishers/models/publisher.interface';
import { PublishersService } from 'src/app/modules/publishers/services/publishers.service';
import { Territory } from 'src/app/modules/territories/models/territories.interface';
import { TerritoriesService } from 'src/app/modules/territories/services/territories.service';

@Component({
  selector: 'app-search-menu',
  templateUrl: './search-menu.component.html',
  styleUrls: ['./search-menu.component.sass']
})
export class SearchMenuComponent {

  public territories!: Territory[];
  public publishers!: Publisher[];
  public displayList: boolean = false;
  destroyObs$: Subject<void> = new Subject();

  public searchForm: FormGroup = this.fb.group({
    search: ['']
  });

  constructor( private publishersService: PublishersService,
               private territoriesService: TerritoriesService,
               private fb: FormBuilder ){}

  getList(){
    const value = this.searchForm.value.search;
    const numberValue = Number(value);

    if( value == 0 || value == '' ){
      this.displayList = false;
      if( this.territories !== undefined ) this.territories.length = 0;
      if( this.publishers !== undefined ) this.publishers.length = 0;

      return;
    }

    if( !isNaN( numberValue ) ){
      this.territoriesService.getTerritories()
        .subscribe(
          territories => this.territories = territories.filter( territory => territory.number.toString().includes(numberValue.toString()) )
        );
        this.displayList = true;
    } 

    if( isNaN( numberValue ) ) {
      this.publishersService.getPublishers()
        .subscribe(
          publishers => this.publishers = publishers.filter( publisher => this.normalizeString(publisher.firstname).toLowerCase().includes(this.normalizeString(value).toLowerCase()) )
        );
        this.displayList = true;
    }

  }

  selectItem(){
    this.displayList = false;
    if( this.territories !== undefined ) this.territories.length = 0;
    if( this.publishers !== undefined ) this.publishers.length = 0;
    this.searchForm.reset();
    this.destroyObs();
  }

  destroyObs(){
    this.destroyObs$.next();
    this.destroyObs$.complete();
  }

  normalizeString(str: string): string {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

}
