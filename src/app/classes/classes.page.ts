import { Component, OnInit } from '@angular/core';


import { DataService } from '../data.service';
import { AuthService } from '../auth.service';
import { Class } from '../models/class.model';
import { Observable } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { ClassesDetailPage } from '../classes-detail/classes-detail.page';
import { ClassesAddPage } from '../classes-add/classes-add.page';
import { ClassSessionsPage } from '../class-sessions/class-sessions.page';


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
        // this.classes.subscribe( values => console.log(values));
      }
    });
    
  }

  async addClass(){
    const modal = await this.modalController.create({
      component: ClassesAddPage,
    });
    modal.onDidDismiss().then( (response) => {
      if( response.data ){
        let classObj:Class = response.data;
        if( classObj.name && classObj.code ){
          this.createClass( classObj );
        }
      }      
    });
    return await modal.present();
  }
  
  async classDetail( classObj ){
    const modal = await this.modalController.create({
      component: ClassesDetailPage,
      componentProps: {
        'id': classObj.id,
        'name': classObj.name,
        'code' : classObj.code,
        'startDate' : classObj.startDate,
        'duration' : classObj.duration
      }
    });
    modal.onDidDismiss().then((response) => {
      // console.log( response );
      if( response.data !== undefined ){
        this.dataService.updateClass(response.data);
      }
    })
    return await modal.present();
  }
  createClass( classObj ){
    let date = new Date( classObj.startDate );
    classObj.startDate = date;
    this.dataService.addClass(classObj);
  }
  async goToSession( classObj ){
    const modal = await this.modalController.create({
      component: ClassSessionsPage,
      componentProps: {
        'id': classObj.id,
        'name': classObj.name,
        'code' : classObj.code,
        'startDate' : classObj.startDate
      }
    });
    return await modal.present();
  }
}
