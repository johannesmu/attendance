import { Component, OnInit } from '@angular/core';
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
  editing:boolean = false;
  constructor(
    private modalController:ModalController,
    private formBuilder:FormBuilder
  ) { }

  ngOnInit() {
  }
  close(){
    this.modalController.dismiss();
  }
  toggleEditing(){
    this.editing = this.editing ? false : true;
  }
}
