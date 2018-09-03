import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { DataProvider } from '../../providers/data/data';

import { Student } from '../../models/student';

@IonicPage()
@Component({
  selector: 'page-class-single',
  templateUrl: 'class-single.html',
})
export class ClassSinglePage {
  id:string;
  classname:string;
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
    let data = this.dataService.getClassData(id)
    .then( (data) => {
      this.classname = data.classname;
      this.students = data.students;
     })
    .catch( (error) => { console.log(error) });
  }
}
