import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { AuthService } from '../auth.service';
import { Class } from '../models/class.model';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-classes',
  templateUrl: './classes.page.html',
  styleUrls: ['./classes.page.scss'],
})
export class ClassesPage implements OnInit {
  classes:Observable<Class[]>;
  constructor(
    private dataService:DataService,
    private authService:AuthService
  ) { }

  ngOnInit() {
    this.authService.authState.subscribe(( user ) => {
      if( user ){
        this.classes = this.dataService.getClasses( user.uid );
      }
    });
  }
  
}
