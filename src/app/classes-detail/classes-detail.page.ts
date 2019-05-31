import { Component, OnInit } from '@angular/core';
import { Class } from '../models/class.model';

@Component({
  selector: 'app-classes-detail',
  templateUrl: './classes-detail.page.html',
  styleUrls: ['./classes-detail.page.scss'],
})
export class ClassesDetailPage implements OnInit {
  class:Class;
  constructor() { }

  ngOnInit() {
  }

}
