import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, getDoc } from '@angular/fire/firestore';
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

  async getTerritoryById( id: string ): Promise<any> {
    const terrRef = doc( this.firestore, 'territories', id );
    try{
      const terrSnap = await getDoc(terrRef); 
      return terrSnap.data();
    }
    catch(error){
      console.log(error);
    }
  }
  
}
