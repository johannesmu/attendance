import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { Student } from '../../models/student';

@IonicPage()
@Component({
  selector: 'page-student-single',
  templateUrl: 'student-single.html',
})
export class StudentSinglePage {
  classid:string;
  classname: string;
  classcode: string;
  studentId: string;
  studentFirstName: string;
  studentLastName: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private view: ViewController)
  {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StudentSinglePage');
  }
  ionViewWillEnter(){
    this.classid = this.navParams.get('classid');
    this.classname = this.navParams.get('classname');
    this.classcode = this.navParams.get('classcode');
  }
  saveStudent(){
    if( this.studentId && this.studentFirstName && this.studentLastName ){
      let data = new Student( this.studentId, this.studentFirstName, this.studentLastName );
    }
    this.view.dismiss( data );
  }
  cancel(){
    this.view.dismiss();
  }
}
