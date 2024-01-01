import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
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

  getPublisher(): Observable<Publisher[]> {
    const publisherRef = collection( this.firestore, 'publishers' );
    return collectionData( publisherRef, { idField: 'id' } ) as Observable<Publisher[]>;
  }
}
