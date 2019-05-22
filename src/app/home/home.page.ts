import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  now:Date;
  constructor(){}
  ngOnInit(){

  }
  ionViewDidEnter(){
    this.now = new Date();
  }
}
