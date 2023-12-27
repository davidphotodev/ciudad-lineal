import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { Territory } from '../models/territories.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TerritoriesService {

  constructor( private firestore: Firestore ) {}

  addTerritory( territory: Territory ){
    const territoryRef = collection(this.firestore, 'territories');
    return addDoc( territoryRef, territory );
  }

  getTerritories(): Observable<Territory[]>{
    const territoryRef = collection( this.firestore, 'territories' );
    return collectionData( territoryRef, { idField: 'id' } ) as Observable<Territory[]>;
  }
  
}
