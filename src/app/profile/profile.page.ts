import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { AngularFireStorage } from '@angular/fire/storage';


import { UserProfile } from '../models/userprofile.model';
import { Camera, CameraOptions } from '@ionic-native/camera';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {
  profile: UserProfile;
  options: CameraOptions = {
    quality: 50,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  currentImage:any;
  constructor(
    private camera:Camera,
    private authService:AuthService,
    private storage:AngularFireStorage

  ) { }

  ngOnInit() {
    this.authService.authState.subscribe(( data ) => {
      if( data ){
       this.profile = {name: '', email: data.email, picture: data.photoURL };
      }
      else{
        this.profile = {name:'', email:'', picture:''};
      }
    });
  }
  getCameraImage(){
    this.camera.getPicture(this.options).then((imageData) => {
      this.currentImage = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
     console.log("Camera issue:" + err);
    });
  }
}
