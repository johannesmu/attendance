import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
// import { auth } from 'firebase';
import { ListPage } from '../list/list';

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
    let month = date.getMonth();
    let day = date.getDay();
    let year = date.getFullYear();
    this.now = day + '/' + month + '/' + year;
  }
}
