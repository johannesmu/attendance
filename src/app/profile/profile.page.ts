import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { AngularFireStorage } from '@angular/fire/storage';


import { UserProfile } from '../models/userprofile.model';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {
  profile: UserProfile = new UserProfile();
  loading: boolean = true;
  constructor(
    private authService:AuthService,
    private storage:AngularFireStorage

  ) { }

  ngOnInit() {
    this.authService.authState.subscribe(( data: any ) => {
      if( data ){
       this.profile.set(data.displayName,data.email,data.photoURL);
      }
    });
  }
  
}
