import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TerritoriesService } from '../../services/territories.service';
import { Territory } from '../../models/territories.interface';
import { PublishersService } from 'src/app/modules/publishers/services/publishers.service';
import { Publisher } from 'src/app/modules/publishers/models/publisher.interface';
import { Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-add-territory',
  templateUrl: './add-territory.component.html',
  styleUrls: ['./add-territory.component.sass'],
  providers: [ 
  ]
})
export class AddTerritoryComponent implements OnInit, OnDestroy {

  private addSuscription: Subscription = new Subscription();

  public addForm: FormGroup = this.fb.group({
    territoryNumber: [0, [ Validators.required, Validators.min(1) ]],
    description: [''],
    territoryMap: ['', [ Validators.required, Validators.minLength(11) ]],
    territoryType: ['', [ Validators.required ]],
    territoryAssigned: ['', [ Validators.required ]]
  });

  public added: boolean = false;
  public error: boolean = false;
  public publishers: Publisher[] = [];
  public destroyObs$: Subject<void> = new Subject();

  constructor( private fb: FormBuilder,
               private TerritoriesService: TerritoriesService,
               private publishersService: PublishersService ){}

  ngOnInit(): void {
    this.publishersService.getPublishers()
      .pipe( takeUntil( this.destroyObs$ ) )
      .subscribe(
        publishers => {
          this.publishers = publishers;
        }
      )
  }

  ngOnDestroy(): void {
    this.destroyObs$.next();
    this.destroyObs$.complete();
  }

  async onSave(){
    if( this.addForm.invalid ){
      this.error = true;
      return;
    }

    const newTerritory: Territory = {
      number :  this.addForm.value.territoryNumber,
      description :  this.addForm.value.description,
      history: [],
      type : this.addForm.value.territoryType,
      map : this.addForm.value.territoryMap,
      publisher : this.addForm.value.territoryAssigned,
      state : '',
      last_date: ''
    };

    const response = await this.TerritoriesService.addTerritory( newTerritory );
    this.error = false;
    this.added = true;
    this.addForm.reset();
  }

}
