import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { DataProvider } from '../../providers/data/data';

import { Session } from '../../models/session';
import { ReadableDate } from '../../models/readabledate';
import { SessionSinglePage } from '../session-single/session-single';

@IonicPage()
@Component({
  selector: 'page-session-manager',
  templateUrl: 'session-manager.html',
})
export class SessionManagerPage {
  classid:string;
  classname:string;
  classcode:string;
  sessions:Array<Session> = [];
  months:Array<string>;
  days:Array<string>;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl:ModalController,
    public dataService:DataProvider
  )
  {
    this.months = ['jan','feb','mar','apr','jun','jul','aug','sep','oct','nov','dec'];
    this.days = ['sun','mon','tue','wed','thu','fri','sat'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SessionManagerPage');
  }
  ionViewWillEnter() {
    this.classid = this.navParams.get('classid');
    this.classname = this.navParams.get('classname');
    this.classcode = this.navParams.get('classcode');
  }
  ionViewDidEnter(){
    this.getSessions();
  }
  showSingle(){
    let data:any = { classid: this.classid, classname: this.classname, classcode: this.classcode };
    const sessionModal = this.modalCtrl.create(SessionSinglePage, data );
    sessionModal.onDidDismiss( (data:Array<Session>) => {
      if( data ){
        this.dataService.addSessions( this.classid, data )
        .then( res => { this.getSessions() })
        .catch( err => { console.log(err) });
      }
    });
    sessionModal.present();
  }
  getSessions(){
    this.dataService.getSessions( this.classid )
    .then( (sessions:Array<Session>) => {
      this.sessions = sessions;
      this.humaniseDate( this.sessions );
    } )
    .catch( (err) => { console.log(err); } );
  }
  humaniseDate( sessions:Array<Session> ){
    sessions.forEach( (session) => {
      session.date = this.humanDate( session.date );
    });
  }
  humanDate( dateStr ){
    let dateObj = new Date( dateStr );
    let date = dateObj.getDate();
    let day = this.days[ dateObj.getDay() ];
    let month = this.months[ dateObj.getMonth() - 1 ];
    let year = dateObj.getFullYear();
    return new ReadableDate(day,date,month,year);
  }
}
