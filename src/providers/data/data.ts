
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Injectable()
export class DataProvider {
  classes: Observable<any[]>;
  classesref:string;
  public classList:Array<any>;
  constructor( public afdb:AngularFireDatabase ) {
    this.classesref = 'classes';
    this.getClasses();
  }
  getClasses(){
    let itemRef = this.afdb.object(this.classesref);
    itemRef.snapshotChanges().subscribe( (action) => {
      this.unwrapClasses(action.payload.val());
    });
  }
  unwrapClasses( classes ){
      let count = Object.keys(classes).length;
      let keys = Object.keys(classes);
      this.classList = [];
      for(let i:number =0; i< count; i++){
        this.classList.push( classes[ keys[i] ]);
      }
  }
}
