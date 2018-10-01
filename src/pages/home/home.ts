import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
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

  constructor(public navCtrl: NavController, public afAuth:AngularFireAuth ) {
    //set todays date
    let date = new Date();
    let month:string = (date.getMonth() + 1).toString();
    let day:string = date.getDate().toString();
    let year:string = date.getFullYear().toString();
    console.log(date);
    this.now = day + '/' + month + '/' + year;
  }
}
