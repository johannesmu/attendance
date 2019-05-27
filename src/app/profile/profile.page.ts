import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { AngularFireStorage } from '@angular/fire/storage';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user:any;
  constructor(
    private authService:AuthService,
    private storage:AngularFireStorage

  ) { }

  ngOnInit() {
    this.authService.authState.subscribe( (user) => {
      if(user){
        this.user = user;
      }
    });
  }

}
