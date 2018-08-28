import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { SignoutPage } from '../pages/signout/signout';
import { SignupPage } from '../pages/signup/signup';

import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public afAuth:AngularFireAuth ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
      { title: 'Login', component: LoginPage },
      { title: 'Sign up', component: SignupPage },
      { title: 'Sign out', component: SignoutPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      //initialise auth observer
      this.afAuth.authState.subscribe(
        (user) => {
          if(user){
            //user is authenticated
            this.rootPage = HomePage;
            this.pages = [
              { title: 'Home', component: HomePage },
              { title: 'List', component: ListPage },
              { title: 'Sign out', component: SignoutPage }
            ];
          }
          else{
            //user is not authenticated
            this.rootPage = LoginPage;
            this.pages = [
              { title: 'Login', component: LoginPage },
              { title: 'Sign up', component: SignupPage }
            ];
          }
        }
      );
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
