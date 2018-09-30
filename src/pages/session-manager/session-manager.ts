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
  sessions:Array<any> = [];
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
  showSingle(){
    let data:any = { classid: this.classid, classname: this.classname, classcode: this.classcode };
    const sessionModal = this.modalCtrl.create(SessionSinglePage, data );
    sessionModal.onDidDismiss(data => {
      if( data ){
        console.log( data );
      }
    });
    sessionModal.present();
  }
}
