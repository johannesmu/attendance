import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../data.service';
import { AuthService } from '../auth.service';
import { Class } from '../models/class.model';

import { ModalController } from '@ionic/angular';

import { ClassesAddPage } from '../classes-add/classes-add.page';
import { ClassSessionsPage } from '../class-sessions/class-sessions.page';


@Component({
  selector: 'app-classes',
  templateUrl: './classes.page.html',
  styleUrls: ['./classes.page.scss'],
})
export class ClassesPage implements OnInit {
  classes:Array<Class>;
  constructor(
    private dataService:DataService,
    private authService:AuthService,
    private modalController:ModalController,
    private router: Router
  ) { }

  ngOnInit() {
    
    this.authService.authState.subscribe(( user ) => {
      if( user ){
        this.dataService.classes$.subscribe((classes) => {
          this.classes = classes;
        });
        this.dataService.getClasses( user.uid );
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
    this.dataService.setCurrentClass( classObj );
    this.router.navigate(['/classes-detail',{ returnTo: '/classes'}]);
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
