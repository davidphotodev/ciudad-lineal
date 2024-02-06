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

  async assignTerritory( territory: Territory, publisher: Publisher, description: string, date_init: string ): Promise<any>{
    const publisher_id = publisher.id ? publisher.id : '';
    const territory_id = territory.id ? territory.id : '';
    const terrRef = doc( this.firestore, 'territories', territory_id );
    const publiRef = doc( this.firestore, 'publishers', publisher_id );
    const moveRef = collection(this.firestore, 'movements');

    // Script for territory
    try{
     const terrSnap = await updateDoc( terrRef,
       { state: 'Assigned',
         publisher: publisher.firstname + ' ' + publisher.lastname,
         publisher_id: publisher.id,
         last_date: date_init
       });
    }
    catch(error){
      console.log(error);
    }

    // Script Publisher
    try{
      const publiSnap = await updateDoc(
        publiRef,
        {
          territories: [ territory.number ],
          history: [{
            territory: territory.number,
            date_init: date_init,
            date_end: '-'
          }]
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
          date_init: date_init,
          date_end: '-',
          publisher: publisher.firstname + ' ' + publisher.lastname,
          subject: 'Asignado',
          territory: territory.number,
          description: description
        }
      )
    }catch(error){
      console.log(error);
    }

  }

  async finishTerritory( publisher_id: string, territory_id: string, publisher: Publisher, territory: Territory, date_end: string ): Promise<any>{
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
          history: [{
            date_init: territory.last_date,
            date_end: date_end,
            publisher: publisher.firstname + ' ' + publisher.lastname,
          }],
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
