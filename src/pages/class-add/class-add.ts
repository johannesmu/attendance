import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { DataProvider } from '../../providers/data/data';

import { Class } from '../../models/class';
import { Student } from '../../models/student';
import { Session } from '../../models/session';


@IonicPage()
@Component({
  selector: 'page-class-add',
  templateUrl: 'class-add.html',
})
export class ClassAddPage {
  classname:string;
  classcode:string;
  classid:string;
  classObj:Class;
  constructor
  (
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthProvider,
    public dataService: DataProvider
  )
  {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClassAddPage');
  }
  addClass(){
    if( this.classname !== undefined ){
      let cls:Class = new Class(this.classname, this.classcode);
      //get the id and set this.classid
      this.classObj = cls;
      this.dataService.addNewClass( cls );
      this.navCtrl.pop();
    }
  }
}
