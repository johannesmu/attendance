import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  now:Date;
  constructor(
    private dataService:DataService
  ){}
  ngOnInit(){

  }
  ionViewDidEnter(){
    this.now = new Date();
  }
}
