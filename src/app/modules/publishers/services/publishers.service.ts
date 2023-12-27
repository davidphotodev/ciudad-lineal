import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Publisher } from '../models/publisher.interface';

@Injectable({
  providedIn: 'root'
})
export class PublishersService {

  constructor( private firestore: Firestore ) { }

  addPublisher( publisher: Publisher ){
    const publisherRef = collection(this.firestore, 'publishers');
    return addDoc( publisherRef, publisher );
  }
}
