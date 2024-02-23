import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDoc } from '@angular/fire/firestore';
import { Publisher } from '../models/publisher.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublishersService {

  constructor( private firestore: Firestore ) { }

  addPublisher( publisher: Publisher ){
    const publisherRef = collection(this.firestore, 'publishers');
    return addDoc( publisherRef, publisher );
  }

  getPublishers(): Observable<Publisher[]> {
    const publisherRef = collection( this.firestore, 'publishers' );
    return collectionData( publisherRef, { idField: 'id' } ) as Observable<Publisher[]>;
  }

  async getPublisherById( id: string ): Promise<any> {
    const publishRef = doc( this.firestore, 'publishers', id );
    try{
      const publishSnap = await getDoc(publishRef); 
      return publishSnap.data();
    }
    catch(error){
      console.error('Error en la promesa:', error);
    }
  }

  deletePublisher( id: string ){
    deleteDoc( doc( this.firestore, 'publishers', id ) );
  }
}
