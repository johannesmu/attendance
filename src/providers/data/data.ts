
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Injectable()
export class DataProvider {
  classes: Observable<any[]>;
  classesref:string;
  constructor( public afdb:AngularFireDatabase ) {
    this.classesref = 'classes';
    this.getClasses();
  }
  getClasses(){
    let itemRef = this.afdb.object(this.classesref);
    itemRef.snapshotChanges().subscribe( (action) => {
      console.log(action.type);
      console.log(action.key);
      console.log(action.payload.val())
    });
  }
  unwrapClasses(){
    this.classes.subscribe( ( classes ) => {
      let count = Object.keys(classes).length;
      let keys = Object.keys(classes);

    });
  }
}
