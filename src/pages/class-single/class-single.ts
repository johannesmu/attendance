import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { DataProvider } from '../../providers/data/data';

import { Student } from '../../models/student';
import { Class } from '../../models/class';

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
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dataService: DataProvider
  )
  {
    this.id = this.navParams.get('classid')? this.navParams.get('classid') : false ;
    if(this.id){
      this.getClassData(this.id);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClassSinglePage');
  }

  getClassData( id ){
    let data = this.dataService.getClassDataById(id)
    .then( (data:Class) => {
      this.classname = data.classname;
      this.students = data.students;
      this.classcode = data.classcode;
     })
    .catch( (error) => { console.log(error) });
  }
}
