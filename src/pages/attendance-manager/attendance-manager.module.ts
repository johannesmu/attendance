import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AttendanceManagerPage } from './attendance-manager';

@NgModule({
  declarations: [
    AttendanceManagerPage,
  ],
  imports: [
    IonicPageModule.forChild(AttendanceManagerPage),
  ],
})
export class AttendanceManagerPageModule {}
