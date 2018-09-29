import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { DataProvider } from '../../providers/data/data';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-signout',
  templateUrl: 'signout.html',
})
export class SignoutPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService:AuthProvider,
    public dataService:DataProvider
  )
  {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignoutPage');
  }

  public signOut(){
    this.dataService.closeData()
    .then( (val) => {
      this.authService.signOut();
    });
    // this.authService.signOut();
    // this.dataService.closeData( () => {
    //   // console.log(result);
    // });
  }

}
