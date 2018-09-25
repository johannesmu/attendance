
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { AuthProvider } from '../auth/auth';

@Injectable()
export class DataProvider {
  private authstate;
  private uid:string;
  classes: Observable<any[]>;
  classesref:string;
  public classList:Array<any>;
  constructor(
    public afdb:AngularFireDatabase,
    private authService:AuthProvider
  )
  {
    this.authService.afAuth.authState.subscribe( (user) => {
      if(user){
        this.authstate = user;
        this.uid = user.uid;
        this.classesref =  this.uid + '/classes';
      }
      else{
        this.authstate = null;
        this.uid = null;
      }
    } );
  }
  getData(){
    let itemRef = this.afdb.object( this.classesref );
    return new Promise( (resolve, reject) =>{
      itemRef.snapshotChanges().subscribe( (action) => {
        if( action.payload.val() ){
          resolve( this.unwrapClasses( action.payload.val() ) );
        }
        else{
          reject(new Error('no data'));
        }
      });
    });
  }
  unwrapClasses( classes ){
      let count = Object.keys(classes).length;
      let keys = Object.keys(classes);
      let classList:Array<any> = [];
      for(let i:number =0; i< count; i++){
        let item = classes[ keys[i] ];
        item.id = keys[i];
        classList.push( item );
      }
      return classList;
  }

  getClassData(id:string){
    let itemRef = this.afdb.object( this.classesref + '/' + id );
    console.log(itemRef);
    return new Promise((resolve, reject) =>{
      itemRef.snapshotChanges().subscribe( (action) => {
        if( action.payload.val() ){
          resolve( action.payload.val() );
        }
        else{
          reject(new Error('no data'));
        }
      });
    });
  }
}
