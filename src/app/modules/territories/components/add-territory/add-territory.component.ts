import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TerritoriesService } from '../../services/territories.service';
import { Territory } from '../../models/territories.interface';

@Component({
  selector: 'app-add-territory',
  templateUrl: './add-territory.component.html',
  styleUrls: ['./add-territory.component.sass'],
  providers: [ 
  ]
})
export class AddTerritoryComponent {

  public addForm: FormGroup = this.fb.group({
    territoryNumber: [0, [ Validators.required, Validators.min(1) ]],
    description: [''],
    territoryMap: ['', [ Validators.required, Validators.minLength(11) ]],
    territoryType: ['', [ Validators.required ]],
    territoryAssigned: ['', [ Validators.required ]]
  });

  public added: boolean = false;
  public error: boolean = false;

  constructor( private fb: FormBuilder,
               private TerritoriesService: TerritoriesService ){}

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
