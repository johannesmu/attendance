import { Component, OnInit } from '@angular/core';


import { DataService } from '../data.service';
import { AuthService } from '../auth.service';
import { Class } from '../models/class.model';
import { Observable } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { ClassesDetailPage } from '../classes-detail/classes-detail.page';
import { ClassesAddPage } from '../classes-add/classes-add.page';


@Component({
  selector: 'app-classes',
  templateUrl: './classes.page.html',
  styleUrls: ['./classes.page.scss'],
})
export class ClassesPage implements OnInit {
  classes:Observable<Class[]>;
  constructor(
    private dataService:DataService,
    private authService:AuthService,
    private modalController:ModalController
  ) { }

  ngOnInit() {
    this.authService.authState.subscribe(( user ) => {
      if( user ){
        this.classes = this.dataService.getClasses( user.uid );
      }
    });
  }

  async addClass(){
    const modal = await this.modalController.create({
      component: ClassesAddPage,
    });
    modal.onDidDismiss().then((data) => {
      console.log( data );
    });
    
    return await modal.present();
  }
  
  async classDetail(){

  }
}
