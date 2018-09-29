import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignoutPage } from '../pages/signout/signout';
import { SignupPage } from '../pages/signup/signup';
import { ClassesPage } from '../pages/classes/classes';
import { ClassSinglePage } from '../pages/class-single/class-single';
import { ClassAddPage } from '../pages/class-add/class-add';

import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  user:any;
  displayName:string;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public afAuth:AngularFireAuth
  )
  {
    this.initializeApp();
    this.pages = [
      { title: 'Home', component: HomePage },
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
            //display the username
            this.user = user;
            this.displayName = user.displayName;
            this.rootPage = HomePage;
            //change navigation to show the following:
            this.pages = [
              { title: 'Home', component: HomePage },
              { title: 'Classes', component: ClassesPage },
              { title: 'Sign out', component: SignoutPage }
            ];
          }
          else{
            //user is not authenticated
            this.user = '';
            this.displayName = null;
            this.rootPage = SignupPage;
            //change navigation to show the following:
            this.pages = [
              { title: 'Login', component: LoginPage },
              { title: 'Sign up', component: SignupPage }
            ];
          }
        }
      );
    });
  }
  async getUserName(){
    return await this.displayName;
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
