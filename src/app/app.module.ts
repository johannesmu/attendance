import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignoutPage } from '../pages/signout/signout';
import { SignupPage } from '../pages/signup/signup';
import { ClassesPage } from '../pages/classes/classes';
import { ClassSinglePage } from '../pages/class-single/class-single';
import { ClassAddPage } from '../pages/class-add/class-add';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';


import { environment } from '../environments/environment';
import { AuthProvider } from '../providers/auth/auth';
import { DataProvider } from '../providers/data/data';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignoutPage,
    SignupPage,
    ClassesPage,
    ClassSinglePage,
    ClassAddPage
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    IonicModule.forRoot(MyApp),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignoutPage,
    SignupPage,
    ClassesPage,
    ClassSinglePage,
    ClassAddPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    DataProvider
  ]
})
export class AppModule {}
