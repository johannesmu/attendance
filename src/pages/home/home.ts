import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireAuth } from 'angularfire2/auth';

import { DataProvider } from '../../providers/data/data';
import { Class } from '../../models/class';
// import { auth } from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private email:string;
  private password:string;
  public user:any;
  public now:string;
  public classes:Array<Class>;
  public authd:any;
  constructor(
    public navCtrl: NavController,
    public afAuth:AngularFireAuth,
    public authService: AuthProvider,
    private dataService:DataProvider
  )
  {
    //set todays date
    let date = new Date();
    let month:string = (date.getMonth() + 1).toString();
    let day:string = date.getDate().toString();
    let year:string = date.getFullYear().toString();
    this.now = day + '/' + month + '/' + year;
  }

  ionViewDidEnter(){
    //load the classes if user is authenticated
    this.authService.afAuth.authState.subscribe( (authd) => {
      if(authd){
        this.authd = authd;
        this.loadClasses();
      }
      else{
        this.authd = null;
      }
    });
  }

  loadClasses(){
    this.dataService.getData()
    .then( (data) =>{
      this.classes = data;
    })
    .catch((error) => {
      console.log(error);
    });
  }
}
