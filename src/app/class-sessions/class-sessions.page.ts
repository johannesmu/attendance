import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';
import { AuthService } from '../auth.service';
import { Session } from '../models/session.model';

@Component({
  selector: 'app-class-sessions',
  templateUrl: './class-sessions.page.html',
  styleUrls: ['./class-sessions.page.scss'],
})
export class ClassSessionsPage implements OnInit {
  //class properties
  id:string;
  name:string;
  code:string;
  startDate:Date;
  sessions$:Observable<Session>;
  constructor(
    private modalController:ModalController,
    private alertController:AlertController,
    private dataService:DataService,
    private authService:AuthService
  ) { }

  ngOnInit() {
    this.authService.authState.subscribe( (user) => {
      if( user ){
        this.getSessions( user.uid, this.id );
      }
    })
  }
  getSessions( uid, classId ){
    this.sessions$ = this.dataService.getClassSessions( uid, classId );
  }
  close(){
    this.modalController.dismiss();
  }
  async addSession(){
    const alert = await this.alertController.create({
      header: 'Add Sessions',
      inputs:[
        { name: 'test',
          type: 'datetime',
          label: 'Date'
        }
      ]
    });
    await alert.present();
  }
}
