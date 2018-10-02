import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';

import { Student } from '../../models/student';
import { DataProvider } from '../../providers/data/data';

import { StudentSinglePage } from '../student-single/student-single';

@IonicPage()
@Component({
  selector: 'page-student-manager',
  templateUrl: 'student-manager.html',
})
export class StudentManagerPage {
  title:string;
  classid:string;
  classname:string;
  classcode:string;
  students:Array<any>;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl:ModalController,
    public dataService:DataProvider
  )
  {
  }

  ionViewWillEnter() {
    this.classid = this.navParams.get('classid');
    this.classname = this.navParams.get('classname');
    this.classcode = this.navParams.get('classcode');
  }
  ionViewDidEnter(){
    this.getStudents( this.classid );
  }
  showSingle(){
    let data = { classid: this.classid, classname: this.classname, classcode: this.classcode };
    const studentModal = this.modalCtrl.create(StudentSinglePage, data );
    studentModal.onDidDismiss(data => {
      if( data ){
        this.addStudent( this.classid, data );
        this.getStudents( this.classid );
      }
    });
    studentModal.present();
  }
  getStudents(classid){
    this.dataService.getClassStudents( classid)
    .then( (data:Array<Student>) => {
      this.students = data;
    })
    .catch( (error) => {console.log(error)} );
  }
  addStudent(classid,student){
    this.dataService.addClassStudent( classid, student );
  }
}
