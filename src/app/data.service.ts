import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Class } from '../app/models/class.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



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
    this.classes = this.classesCollection.snapshotChanges().pipe(
      map(
        actions => actions.map(
          values => {
            const data = values.payload.doc.data() as Class;
            const id = values.payload.doc.id;
            return {id, ...data };
          }
        )
      )
    );
    return this.classes;
  }
  addClass( classObj:Class ){
    this.classesCollection.add( classObj );
  }
  updateClass(classId:string,classObj:Class){
    //update the class object in Firestore
    this.classesCollection.doc(classId).update(classObj)
    .then((res) => {
      //success
    })
    .catch((err)=> {
      //error
    })
  }
}
