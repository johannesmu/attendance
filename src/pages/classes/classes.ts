import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
  selector: 'page-classes',
  templateUrl: 'classes.html',
})
export class ClassesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private dataService:DataProvider ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClassesPage');
  }

}
