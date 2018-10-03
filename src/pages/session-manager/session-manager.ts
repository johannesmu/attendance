import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { DataProvider } from '../../providers/data/data';

import { Session } from '../../models/session';
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
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl:ModalController,
    public dataService:DataProvider
  )
  {
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
    this.getSessions( this.classid );
  }
  showSingle(){
    let data:any = { classid: this.classid, classname: this.classname, classcode: this.classcode };
    const sessionModal = this.modalCtrl.create(SessionSinglePage, data );
    sessionModal.onDidDismiss( (data:Array<Session>) => {
      if( data ){
        this.dataService.addSessions( this.classid, data );
      }
    });
    sessionModal.present();
  }
  getSessions(){
    this.dataService.getSessions( this.classid )
    .then( (sessions) => { this.sessions = sessions } )
    .catch( (err) => { console.log(err); } );
  }
}
