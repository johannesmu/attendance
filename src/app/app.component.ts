import { Component } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
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
    private authService:AuthService,
    private router:Router,
    private menu:MenuController
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
        this.user = user;
        this.appPages = [
          {
            title: 'Dashboard',
            url: '/home',
            icon: 'planet'
          },
          {
            title: 'Classes',
            url: '/classes',
            icon: 'apps'
          },
          {
            title: 'Sessions',
            url: '/sessions',
            icon: 'time'
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

  openProfile(){
    this.menu.close();
    this.router.navigate(['/profile']);
  }
}
