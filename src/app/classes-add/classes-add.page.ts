import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-classes-add',
  templateUrl: './classes-add.page.html',
  styleUrls: ['./classes-add.page.scss'],
})
export class ClassesAddPage implements OnInit {

  constructor(
    modalController:ModalController
  ) { }

  ngOnInit() {
  }
  close(){
    this.modalController.dismiss();
  }
}
