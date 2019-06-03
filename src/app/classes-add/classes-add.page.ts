import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Class } from '../models/class.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-classes-add',
  templateUrl: './classes-add.page.html',
  styleUrls: ['./classes-add.page.scss'],
})
export class ClassesAddPage implements OnInit {
  classForm:FormGroup;
  class:Class;
  formSub:Subscription;
  constructor(
    private modalController:ModalController,
    private formBuilder:FormBuilder
  ) { }

  ngOnInit() {
    this.classForm = this.formBuilder.group({
      name: ['',[ Validators.required, Validators.minLength(3) ]],
      code:['',[ Validators.required, Validators.minLength(6) ]],
      startDate: [ this.now() , [Validators.required ]],
      duration: [1,[Validators.required, Validators.min(1) ]],
      weeks: [1,[Validators.required, Validators.min(1) ]]
    });
    this.formSub = this.classForm.valueChanges.subscribe((values) => {
      this.formatCode( values.code );
    });
  }
  close(){
    this.formSub.unsubscribe();
    this.classForm.reset();
    this.modalController.dismiss();
  }
  save(){
    this.modalController.dismiss( this.classForm.value );
  }
  now(){
    const date:Date = new Date();
    const year = date.getFullYear();
    let month = ( date.getMonth() + 1 ).toString();
    month = (month.length == 1) ? `0${month}`  : month;
    let day = date.getDate().toString();
    day = (day.length == 1) ? '0' + day  : day;
    let now = `${year}-${month}-${day}`;
    return now;
  }
  formatCode(code){
    let chars:Array<string> = code.split('');
    if( code.length == 6 ){
      chars.splice( 3, 0, '-');
      let upperChars = chars.map(( char )=>{
        return char.toUpperCase();
      });
      this.classForm.patchValue({code: upperChars.join('')},{emitEvent:false});
    }
  }
}
