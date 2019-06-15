import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Session } from '../app/models/session.model';
import { Class } from '../app/models/class.model';
import { Student } from '../app/models/student.model';



@Injectable({
  providedIn: 'root'
})
export class DataService {
  currentClassId$:BehaviorSubject<string> = new BehaviorSubject('');
  //classes
  classesCollection: AngularFirestoreCollection<Class>;
  classes$:BehaviorSubject<Class[]> = new BehaviorSubject([]);
  //sessions
  sessionsCollection:AngularFirestoreCollection<Session>;
  sessions$:Observable<Session[]>;
  //students
  studentsCollection: AngularFirestoreCollection<Student>;
  constructor(
    private afStore:AngularFirestore
    
  ) { }

  setCurrentClass(classObj:Class){
    this.currentClassId$.next( classObj.id );
  }
  
  getClasses( uid ){
    let path = `users/${uid}/classes/`;
    this.classesCollection = this.afStore.collection<Class>( path );
    let classData = this.classesCollection.snapshotChanges().pipe(
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
    classData.subscribe((values) => { this.classes$.next(values) });
  }
  
  addClass( classObj:Class ){
    this.classesCollection.add( classObj );
  }
  updateClass(classObj){
    console.log(classObj);
    // update the class object in Firestore using its id
    this.classesCollection.doc(classObj.id).update({name: classObj.name, code: classObj.code, startDate: classObj.startDate })
    .then((res) => {
      //success
      console.log(res);
    })
    .catch((err)=> {
      //error
      console.log(err);
    })
  }
  getClassSessions( uid, classId ){
    let path = `users/${uid}/classes/${classId}/sessions`;
    this.sessionsCollection = this.afStore.collection<Session>( path );
    this.sessions$ = this.sessionsCollection.snapshotChanges().pipe(
      map(
        actions => actions.map(
          values => {
            const data = values.payload.doc.data() as Session;
            const id = values.payload.doc.id;
            return {id, ...data };
          }
        )
      )
    );
    return this.sessions$;
  }
}
