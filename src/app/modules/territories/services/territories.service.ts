import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Territory } from '../models/territories.interface';

@Injectable({
  providedIn: 'root'
})
export class TerritoriesService {

  constructor( private firestore: Firestore ) {}

  addTerritory( territory: Territory ){
    const territoryRef = collection(this.firestore, 'territories');
    return addDoc( territoryRef, territory );
  }
  
}
