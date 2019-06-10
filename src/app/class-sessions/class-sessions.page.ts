import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student.model';
import { Observable } from 'rxjs';

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
  constructor() { }

  ngOnInit() {
  }
  getSessions(){

  }
}
