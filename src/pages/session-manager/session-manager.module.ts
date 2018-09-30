import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SessionManagerPage } from './session-manager';

@NgModule({
  declarations: [
    SessionManagerPage,
  ],
  imports: [
    IonicPageModule.forChild(SessionManagerPage),
  ],
})
export class SessionManagerPageModule {}
