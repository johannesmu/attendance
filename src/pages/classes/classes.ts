import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { AuthProvider } from '../../providers/auth/auth';
import { DataProvider } from '../../providers/data/data';

import { ClassSinglePage } from '../class-single/class-single';

@IonicPage()
@Component({
  selector: 'page-classes',
  templateUrl: 'classes.html',
})
export class ClassesPage {
  public classes:any;
  private authd:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthProvider,
    private dataService:DataProvider ) {
      this.authService.authstate.subscribe( (authd) => {
        if(authd){
          this.authd = authd;
          this.getClasses();
        }
        else{
          this.authd = null;
        }
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClassesPage');
  }
  getClasses(){
    this.dataService.getData()
    .then( (data) =>{
      this.classes = data;
      console.log(this.classes);
    })
    .catch((error) => {
      console.log(error);
    });
  }
  viewSingle(id){
    let data = { classid: id };
    this.navCtrl.push( ClassSinglePage, data );
  }
}
