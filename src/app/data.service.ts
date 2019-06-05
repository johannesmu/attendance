import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Class } from '../app/models/class.model';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class DataService {
  classesCollection:AngularFirestoreCollection<Class>;
  classes:Observable<Class[]>
  constructor(
    private afStore:AngularFirestore
    
  ) { }

  getSessions(){
    
  }
  getClasses( uid ){
    let path = `users/${uid}/classes/`;
    this.classesCollection = this.afStore.collection<Class>( path );
    this.classes = this.classesCollection.valueChanges();
    return this.classes;
  }
  addClass( classObj:Class ){
    this.classesCollection.add( classObj );
  }
  updateClass(){
    //update the class object in Firestore
  }
}
