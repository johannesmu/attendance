import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { Session } from '../../models/session';

@IonicPage()
@Component({
  selector: 'page-session-single',
  templateUrl: 'session-single.html',
})
export class SessionSinglePage {
  title:string;
  date:string;
  start:string;
  end:string;
  repeat:number = 12;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private view: ViewController
  )
  {
    this.title = this.getClassName() + ' ' + 'Session';
    //set defaults
    this.start = '08:30';
    this.date = this.getToday();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SessionSinglePage');
  }
  getToday(){
    let date = new Date();
    let day:string = date.getDate().toString();
    day = ( day.length == 1 ) ? '0' + day : day;
    let month:string = (date.getMonth() + 1).toString();
    let year:string = date.getFullYear().toString();
    return year + '-' + month + '-' + day ;
  }
  getClassName(){
    return this.navParams.get('classname');
  }

  setEndTime(){
    //set the value of end time using the start time
    if( this.start ){
      let times = this.start.split(':');
      //add two hours to the start time
      this.end = (parseInt(times[0]) + 2) + ':' + times[1];
    }
  }

  cancel(){
    this.view.dismiss();
  }


}
