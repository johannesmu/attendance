import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthProvider } from '../../providers/auth/auth';
import { DataProvider } from '../../providers/data/data';

import { Student } from '../../models/student';
import { Class } from '../../models/class';
import { Session } from '../models/session';

@IonicPage()
@Component({
  selector: 'page-class-single',
  templateUrl: 'class-single.html',
})
export class ClassSinglePage {
  id:string;
  classname:string;
  classcode:string;
  students:Array<Student>;
  sessions:Array<Session>;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dataService: DataProvider,
    private formBuilder: FormBuilder
  )
  {
    this.id = this.navParams.get('classid')? this.navParams.get('classid') : false ;
    if(this.id){
      this.getClassData(this.id);
    }
    this.classForm = formBuilder.group({
      classname: ['bro', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      classcode: ['', Validators.compose([Validators.maxLength(7), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])]
    });
  }

  ionViewDidLoad() {
  }

  getClassData( id ){
    let data = this.dataService.getClassDataById(id)
    .then( (data:Class) => {
      this.classname = data.classname;
      this.students = data.students;
      this.sessions = data.sessions;
      this.classcode = data.classcode;
     })
    .catch( (error) => { console.log(error) });
  }
  saveClass(){
    let ncls = new Class(this.classname,this.classcode);
    ncls.classid = this.id;
    ncls.students = this.students ? this.students: null;
    ncls.sessions = this.sessions ? this.sessions : null;
    this.dataService.updateClass( ncls );
    this.navCtrl.pop();
  }
}
