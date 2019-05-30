import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { AuthService } from '../auth.service';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  now:Date;
  constructor(
    private authService:AuthService,
    private dataService:DataService
  ){}
  ngOnInit(){
    //subscribe to authentication state
    this.authService.authState.subscribe( (user) => {
      if( user ){
        // get upcoming sessions
      }
    })
  }
  ionViewDidEnter(){
    this.now = new Date();
  }

  getUpcomingSessions(){
    
  }
}
