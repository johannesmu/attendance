import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Class } from '../models/class.model';

@Component({
  selector: 'app-classes-detail',
  templateUrl: './classes-detail.page.html',
  styleUrls: ['./classes-detail.page.scss'],
})
export class ClassesDetailPage implements OnInit {
  name:string;
  code:string;
  startDate:Date;
  duration:number;
  id:string;
  editing:boolean = false;
  classObject = {name: this.name, code: this.code, duration: this.duration, startDate: this.startDate };
  classForm:FormGroup;
  formChanged:boolean = false;
  constructor(
    private modalController:ModalController,
    private formBuilder:FormBuilder,
    private router:Router
  ) { }

  ngOnInit() {
    this.classForm = this.formBuilder.group({
      id: [this.id, [Validators.nullValidator] ],
      name: [this.name ,[ Validators.required, Validators.minLength(3) ]],
      code:[this.code ,[ Validators.required, Validators.minLength(6) ]],
      startDate: [ this.startDate , [Validators.required ]]
     });
    this.classForm.valueChanges.subscribe((formValues) =>{
      if( this.classForm.valid ){
        this.formChanged = true;
      }
      else{
        this.formChanged = false;
      }
    });
  }
  close(){
    this.modalController.dismiss();
  }
  toggleEditing(){
    this.editing = this.editing ? false : true;
  }
  save(){
    this.modalController.dismiss( this.classForm.value );
  }

  openStudents(){
    this.close();
    this.router.navigate(['/class-students']);
  }
  openSessions(){
    this.close();
    this.router.navigate(['/class-sessions']);
  }
}
