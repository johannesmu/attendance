import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import{ DateProvider } from '../../providers/date/date';

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
  room:string = 'class room';
  repeat:number = 12;
  generate:boolean = true;
  sessionLength:number = 2;
  sessionInterval:number = 7;
  sessions:Array<Session>;
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
    this.setEndTime();
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad SessionSinglePage');
  }
  ionViewDidEnter(){
    this.start = '08:30';
    this.date = this.getToday();
    this.setEndTime();
  }
  getToday(){
    let date = new Date();
    let day:string = date.getDate().toString();
    day = ( day.length == 1 ) ? '0' + day : day;
    let month:string = (date.getMonth() + 1).toString();
    let year:string = date.getFullYear().toString();
    return year + '-' + month + '-' + day ;
  }
  formatDate( date, formatStr, separator ){
    let day:string = date.getDate().toString();
    day = ( day.length == 1 ) ? '0' + day : day;
    let month:string = (date.getMonth() + 1).toString();
    let year:string = date.getFullYear().toString();
    switch( formatStr ){
      case 'dmy':
        return day + separator + month + separator + year ;
      case 'ymd':
        return year + separator + month + separator + day ;
      default:
        return day + separator + month + separator + year ;

    }
  }
  getClassName(){
    return this.navParams.get('classname');
  }

  setEndTime(){
    //set the value of end time using the start time
    if( this.start ){
      let times:Array<string> = this.start.split(':');
      //add two hours to the start time
      let startHour:number = Number( times[0] ) + Number(this.sessionLength);
      let endTime = ( startHour.toString() + ':' + times[1]);
      this.end = endTime;
    }
  }

  generateSessions( sessionObj:Session , totalSessions ){
    //get the date of the session object
    let date = new Date( this.parseDate(sessionObj.date) );
    let sessionDates:Array<string> = [];

    for(let i:number = 0; i < totalSessions; i++ ){
      let multiplier:number = (i < 1) ? 0 : 1;
      date.setDate( date.getDate() + ( this.sessionInterval ) );
      sessionDates.push( this.formatDate(date,'ymd','-') );
    }
    // console.log( sessionDates );
    //generate the array of session objects
    let sessions:Array<Session> = [];
    for( let i:number = 0; i < totalSessions; i++ ){
      let session = new Session( sessionDates[i] , sessionObj.start, sessionObj.end, sessionObj.room );
      sessions.push( session );
    }
    return sessions;
  }

  parseDate( dateStr:string ){
    let dateComponents:Array<string> = [];
    let separator:string = null;
    if( dateStr.includes('-') ){
      separator = '-';
    }
    if( dateStr.includes('/') ){
      separator = '/';
    }
    dateComponents = dateStr.split( separator );
    let newStr:string = dateComponents[1] + separator + dateComponents[2] + separator + dateComponents[0];
    return newStr;
  }
  saveSessions(){
    let sessionSingle:Session = new Session(this.date,this.start,this.end,this.room);
    let data:Array<Session> = [];
    if( this.generate == true ){
      let data:Array<Session> = this.generateSessions( sessionSingle, this.repeat );
    }
    else{
      let data:Array<Session> = [ sessionSingle ];
    }
    // console.log( data );
    this.view.dismiss( data );
  }

  cancel(){
    this.view.dismiss();
  }


}
