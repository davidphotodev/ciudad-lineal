import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { Territory } from '../models/territories.interface';
import { Observable } from 'rxjs';
import { Publisher } from '../../publishers/models/publisher.interface';

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

  async assignTerritory( id: string ): Promise<any>{
    const terrRef = doc( this.firestore, 'territories', id );
    try{
     const terrSnap = await updateDoc( terrRef, { state: 'Assigned', publisher: 'Testing too' } );
    }
    catch(error){
      console.log(error);
    }
  }

  async finishTerritory( publisher_id: string, territory_id: string, publisher: Publisher, territory: Territory, date_end: string ): Promise<any>{
    console.log( 'Id del territorio: ' + territory.id );
    const terrRef = doc( this.firestore, 'territories', territory_id );
    const publiRef = doc( this.firestore, 'publishers', publisher_id );
    const moveRef = collection(this.firestore, 'movements');

    // Script Territory
    try{
     const terrSnap = await updateDoc(
        terrRef,
        { 
          state: 'Not assigned',
          publisher: '',
          history: {
            date_init: territory.last_date,
            date_end: date_end,
            publisher: publisher.firstname + ' ' + publisher.lastname,
          },
          publisher_id: ''
        }
      );
    }catch(error){
      console.log(error);
    }

    // Script Publisher
    try{
      const publiSnap = await updateDoc(
        publiRef,
        {
          territories: [],
          history: {
            territory: territory.number,
            date_init: territory.last_date,
            date_end: date_end
          }
        }
      )

    }catch(error){
      console.log(error);
    }

    // Script Movements
    try{
      addDoc(
        moveRef,
        {
          date_init: territory.last_date,
          date_end: date_end,
          publisher: publisher.firstname + ' ' + publisher.lastname,
          subject: 'Terminado',
          territory: territory.number
        }
      )
    }catch(error){
      console.log(error);
    }
  }
  
}
