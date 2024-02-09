import { Component, OnDestroy, OnInit } from '@angular/core';
import { PublishersService } from '../../services/publishers.service';
import { Publisher } from '../../models/publisher.interface';
import { ActivatedRoute } from '@angular/router';
import { image } from 'src/assets/vars/globals';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Territory } from 'src/app/modules/territories/models/territories.interface';
import { TerritoriesService } from 'src/app/modules/territories/services/territories.service';
import { DatesService } from 'src/app/core/services/dates.service';
import { Subject, takeUntil } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.sass']
})
export class DetailComponent implements OnInit, OnDestroy {
  
  public finishModalClass: string = 'd-none';
  public publisher!: Publisher;
  public imgSlug: string = image.slug;
  public showForm: boolean = false;
  public showList: boolean = false;
  public territories!: Territory[];
  public territoriesToAssign!: Territory[];
  public territorySelected!: Territory;
  public error: boolean = false;
  public success: boolean = false;
  public assignForm: FormGroup = this.fb.group({
    territory: ['', [Validators.required, Validators.min(1)]],
    description: ['']
  });
  public destroyObs$: Subject<void> = new Subject();
  

  constructor( private publishersService: PublishersService,
               private activatedRoute: ActivatedRoute,
               private territoriesService: TerritoriesService,
               private fb: FormBuilder,
               private datesService: DatesService ){}
  
   ngOnInit() {
      this.getCurrentPublisherData();
      this.getTerritories();
  }

  ngOnDestroy() {
    this.destroyObs$.next();
    this.destroyObs$.complete();
  }

  async getCurrentPublisherData(){
    this.activatedRoute.params
      .subscribe(
        async ({ id }) => {
          const getPublisher = await this.publishersService.getPublisherById( id );
          this.publisher = getPublisher;
          this.publisher.id = id;
        }
      );
  }

  assignTerritory(){

    const territory = this.territorySelected;
    const publisher = this.publisher;

    if( this.assignForm.disabled ){
      return;
    }

    if( !this.territorySelected || this.assignForm.value.territory === 0 || this.assignForm.value.territory === '' ){
      this.error = true;
      return;
    }
    
    const description = this.assignForm.value.description;
    const currentDate = moment().format('DD-MM-YYYY');
    this.territoriesService.assignTerritory( territory, publisher, description, currentDate );
    this.assignForm.disable();
    this.success = true;
  }

  getTerritories(){
    this.territoriesService.getTerritories()
      .pipe( takeUntil( this.destroyObs$ ) )
      .subscribe(
        territories => { this.territories = territories }
      );
  }

  selectTerritory( territory: Territory ){
    this.assignForm.value.territory = territory.number;
    this.territorySelected = territory;
    this.showList = false;
  }

  displayList(){
    const territoryNumber = this.assignForm.value.territory;

    if( territoryNumber == 0 || territoryNumber == '' ){
      return;
    }

    if( territoryNumber > 0 ){
      this.territoriesToAssign = this.territories.filter(
        territory => territory.number === territoryNumber && territory.state === 'Not assigned'
      );
      this.showList = true;
    }

    if( territoryNumber == 0 || !territoryNumber ){
      this.showList = false;
    }
  }

  hideModal( value: string ){
    this.finishModalClass = value;
  }

  displayForm(){
    this.showForm = true;
  }

  hideForm(){
    this.assignForm.reset();
    this.showList = false;
    this.showForm = false;
  }

}
