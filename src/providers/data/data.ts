
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
// import { Observable } from 'rxjs';
import { AuthProvider } from '../auth/auth';

import { Class } from '../../models/class';
import { Student } from '../../models/student';
import { Session } from '../../models/session';

@Injectable()
export class DataProvider {
  private authstate;
  private uid:string;
  private classesRef:string;
  private itemRef:any;
  private classSub:any;
  private studentsSub:any;
  constructor(
    public afdb:AngularFireDatabase,
    private authService:AuthProvider
  )
  {
    this.authService.afAuth.authState.subscribe( (user) => {
      if(user){
        this.authstate = user;
        this.uid = user.uid;
        this.classesRef =  this.uid + '/classes';
      }
      else{
        this.authstate = null;
        this.uid = null;
      }
    } );
  }
  getData(){
    this.itemRef = this.afdb.object( this.classesRef );
    return new Promise( (resolve, reject) =>{
      let data = this.afdb.object( this.classesRef ).snapshotChanges();
      this.classSub = data.subscribe( (action) =>{
        if( action.payload.val() ){
          resolve( this.unwrapObjects( action.payload.val() ) );
        }
        else{
          reject( new Error('no data available') );
        }
      });
    });
  }
  closeData(){
    return new Promise( (resolve, reject) => {
      if( this.classSub ){
        this.classSub.unsubscribe();
        if( this.classSub.closed == true ){
          resolve( true );
        }
        else{
          reject( false );
        }
      }
      else{
        reject( false );
      }
    });
  }
  unwrapObjects( classes ){
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

  getClassDataById(id:string){
    let itemRef = this.afdb.object( this.classesRef + '/' + id );
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
  addNewClass( cls:Class ){
    let ref = this.classesRef + '/' + cls.classid;
    let itemRef = this.afdb.object( ref );
    itemRef.set( cls );
  }
  updateClass( cls:Class ){
    let ref = this.classesRef + '/' + cls.classid;
    let itemRef = this.afdb.object( ref );
    itemRef.update( cls );
  }
  getClassStudents( classid ){
    let ref = this.classesRef + '/' + classid + '/' + 'students';
    return new Promise( (resolve,reject) => {
      let itemRef = this.afdb.object( ref ).snapshotChanges();
      this.studentsSub = itemRef.subscribe( (action) => {
        if( action.payload.val() ){
          resolve( this.unwrapObjects( action.payload.val() ) );
        }
        else{
          reject( new Error('no student data') );
        }
      });
    });
  }
  addClassStudent( classid:string, student:Student ){
    console.log( student );
    let ref:string = this.classesRef + '/'
    + classid + '/'
    + 'students' + '/'
    + student.studentid;
    let studentsRef = this.afdb.object( ref );
    studentsRef.set( student )
    .then( res => console.log(res))
    .catch( err => console.log(err));
  }
}
