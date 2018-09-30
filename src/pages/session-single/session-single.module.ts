import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SessionSinglePage } from './session-single';

@NgModule({
  declarations: [
    SessionSinglePage,
  ],
  imports: [
    IonicPageModule.forChild(SessionSinglePage),
  ],
})
export class SessionSinglePageModule {}
