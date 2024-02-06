import { Component, OnDestroy, OnInit } from '@angular/core';
import { Territory } from '../../models/territories.interface';
import { TerritoriesService } from '../../services/territories.service';
import { ActivatedRoute } from '@angular/router';
import { Publisher } from 'src/app/modules/publishers/models/publisher.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PublishersService } from 'src/app/modules/publishers/services/publishers.service';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-assign-territory',
  templateUrl: './assign-territory.component.html',
  styleUrls: ['./assign-territory.component.sass']
})
export class AssignTerritoryComponent implements OnInit, OnDestroy {

  public territory!: Territory;
  public publisherList!: Publisher[];
  public resultPublishers!: Publisher[];
  public publisherSelected!: Publisher;
  public list: boolean = false;
  public destroyObs$: Subject<void> = new Subject();
  public error: boolean = false;
  public success: boolean = false;

  public assignForm: FormGroup = this.fb.group({
    publisher: ['', [ Validators.required, Validators.min(1) ]],
    description: ['', [ Validators.required, Validators.min(1) ]]
  });
  
  formattedDate: string;

  constructor( 
    private territoriesService: TerritoriesService,
    private publishersService: PublishersService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
    ){
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
  // Getting current territory data
   this.activatedRoute.params
    .subscribe(
      async ({ id }) => {
        const territoryData = await this.territoriesService.getTerritoryById( id );
        this.territory = territoryData;
        this.territory.id = id;
        if( this.territory.state == 'Assigned' ){
          this.assignForm.disable();
        }
      }
    );

    // Getting publisher list to show in search input
    this.publishersService.getPublishers()
        .pipe( takeUntil( this.destroyObs$ ) )
        .subscribe(
          publishers => {
            // Assigning and sorting publisher list
            this.publisherList = publishers.sort((a, b) => {
              if( a.firstname < b.firstname ){ return -1; }
              if( a.firstname > b.firstname ){ return 1; }
              if (a.lastname < b.lastname) { return -1; }
              if (a.lastname > b.lastname) { return 1; }
              return 0;
            });
          }
        );
  }

  // Destroying observable
  ngOnDestroy(): void {
    this.destroyObs$.next();
    this.destroyObs$.complete();
  }

  // Search publishers while name is writing
  showList(){
    let search: string = this.assignForm.value.publisher;

    if( search.length <= 2 ){
      this.list = false;
    }

    // If input has 3 characters, display result of search
    if( search.length > 2 ){
      this.resultPublishers = this.publisherList.filter(
        publisher => {
          // Showing publisher list, only if the publisher has not territory assigned
          const resultList = this.normalizeString(publisher.firstname).toLowerCase().includes( this.normalizeString(search).toLowerCase() );
          const hasTerritories = publisher.territories.length == 0;
          this.list = true;

          return resultList && hasTerritories;
        }
      );

    }
  }

  selectPublisher( publisher: Publisher ){
    this.assignForm.get('publisher')?.setValue( publisher.firstname + ' ' + publisher.lastname );
    this.list = false;
    this.publisherSelected = publisher;
  }

  // This function transforms the string for better comparison
  normalizeString(str: string): string {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  // Assigning territory to publisher
  async assignTerritory( territory: Territory, publisher: Publisher, description: string, date_init: string ){
    if( this.assignForm.disabled ){
      return;
    }

    if( !this.publisherSelected ){
      this.error = true;
      return;
    }

    await this.territoriesService.assignTerritory( territory, publisher, description, date_init );
    this.success = true;
    this.assignForm.disable();
  }

}
