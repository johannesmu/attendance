import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Class } from '../models/class.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-classes-add',
  templateUrl: './classes-add.page.html',
  styleUrls: ['./classes-add.page.scss'],
})
export class ClassesAddPage implements OnInit {
  classForm:FormGroup;
  class:Class;
  constructor(
    private modalController:ModalController,
    private formBuilder:FormBuilder
  ) { }

  ngOnInit() {
    this.classForm = this.formBuilder.group({
      name: ['',[ Validators.required, Validators.minLength(3) ]],
      code:['',[ Validators.required, Validators.minLength(6) ]],
      startDate: ['', [Validators.required ]],
      duration: [1,[Validators.required, Validators.min(1) ]]
    });
  }
  close(){
    this.modalController.dismiss();
  }
}
