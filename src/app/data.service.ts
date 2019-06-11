import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Session } from '../app/models/session.model';
import { Class } from '../app/models/class.model';
import { Student } from '../app/models/student.model';



@Injectable({
  providedIn: 'root'
})
export class DataService {
  currentClass$ = new BehaviorSubject<Class>();
  currentSession$ = new BehaviorSubject<Session>();
  //classes
  classesCollection: AngularFirestoreCollection<Class>;
  classes$:Observable<Class[]>;
  //sessions
  sessionsCollection:AngularFirestoreCollection<Session>;
  sessions$:Observable<Session>;
  //students
  studentsCollection: AngularFirestoreCollection<Student>;
  constructor(
    private afStore:AngularFirestore
    
  ) { }

  setCurrentClass(classObj:Class){
    this.currentClass$.next( classObj );
  }
  getClasses( uid ){
    let path = `users/${uid}/classes/`;
    this.classesCollection = this.afStore.collection<Class>( path );
    this.classes$ = this.classesCollection.snapshotChanges().pipe(
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
    return this.classes$;
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
    })
    .catch((err)=> {
      //error
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
            console.log({ id, ...data});
            return {id, ...data };
          }
        )
      )
    );
    return this.sessions$;
  }
}
