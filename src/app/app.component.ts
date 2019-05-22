import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Subscription } from 'rxjs';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  sub:Subscription;
  user:any;
  public appPages = [
    {
      title: 'Signup',
      url: '/signup',
      icon: 'person-add'
    },
    {
      title: 'Signin',
      url: '/signin',
      icon: 'log-in'
    }
  ];
  

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService:AuthService
    
  ) {
    this.initializeApp();
    this.subscribeToAuth();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  subscribeToAuth(){
    this.sub = this.authService.authState.subscribe( (user) => {
      if( user ){
        console.log(user);
        this.user = user;
        this.appPages = [
          {
            title: 'Sessions',
            url: '/sessions',
            icon: 'time'
          },
          {
            title: 'Classes',
            url: '/classes',
            icon: 'apps'
          },
          {
            title: 'Signout',
            url: '/signout',
            icon: 'log-out'
          },
        ]
      }
      else{
        this.appPages = [
          {
            title: 'Signup',
            url: '/signup',
            icon: 'person-add'
          },
          {
            title: 'Signin',
            url: '/signin',
            icon: 'log-in'
          }
        ];
      }
    })
  }
}
