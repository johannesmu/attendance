import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireAuth } from 'angularfire2/auth';

import { DataProvider } from '../../providers/data/data';
import { DateProvider } from '../../providers/date/date';
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
  public dataLoading = false;
  constructor(
    public navCtrl: NavController,
    public afAuth:AngularFireAuth,
    public authService: AuthProvider,
    private dataService:DataProvider,
    private dateService:DateProvider
  )
  {
    this.now = this.getTodaysDate();
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
    this.dataLoading = true;
    this.dataService.getData()
    .then( (data:Array<Class>) =>{
      this.classes = data;
      this.dataLoading = false;
    })
    .catch((error) => {
      console.log(error);
    });
  }

  getTodaysDate(){
    let today:string = this.dateService.getToday();
    //get day of the week
    let date:any = new Date(today);
    return  today;
  }
}
