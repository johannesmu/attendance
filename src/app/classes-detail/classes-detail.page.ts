import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Class } from '../models/class.model';
import { Subscription, Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-classes-detail',
  templateUrl: './classes-detail.page.html',
  styleUrls: ['./classes-detail.page.scss'],
})
export class ClassesDetailPage implements OnInit {
  returnTo:string;
  currentClass:Class /*= {id:'',name:'',code: '',startDate: new Date() } as Class*/;
  classForm:FormGroup;
  editing:boolean = false;

  constructor(
    private modalController:ModalController,
    private formBuilder:FormBuilder,
    private router:Router,
    private activatedRoute: ActivatedRoute,
    private dataService: DataService
  ) {
    this.currentClass = {id:'',name:'',code: '',startDate: new Date() } as Class;
   }

  ngOnInit() {
    this.classForm = this.formBuilder.group({
      id: [this.currentClass.id, [Validators.nullValidator] ],
      name: [this.currentClass.name ,[ Validators.required, Validators.minLength(3) ]],
      code:[this.currentClass.code ,[ Validators.required, Validators.minLength(3) ]],
      startDate: [ this.currentClass.startDate , [Validators.required ]]
    });
    
    //subscribe to get current class id
    this.dataService.currentClassId$.subscribe((classId:string) => {
      this.getClass(classId).then((response) => {
        console.log( response );
      });
    });
  }

  ionViewWillEnter(){
    //get route to return to
    this.returnTo = this.activatedRoute.snapshot.paramMap.get('returnTo');

  }
  setFormValues( classObj ){
    console.log( classObj );
  }
  async getClass( classId ){
    console.log(classId);
      await this.dataService.classes$.subscribe( (values) => { 
        let classObj = values.filter( (classData ) => {
          if( classData.id == classId ){
            console.log(classData);
            return classData;
          }
        });
        Promise.resolve( classObj[0] );
      });
  }
  
  close(){
    this.router.navigate([this.returnTo]);
  }
  save(){
    this.dataService.updateClass(this.classForm.value);
    this.close();
  }
  toggleEdit(){
    this.editing = this.editing ? false : true;
  }
}
