import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-signout',
  templateUrl: 'signout.html',
})
export class SignoutPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService:AuthProvider ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignoutPage');
  }

  public signOut(){
    this.authService.signOut();
  }

}
