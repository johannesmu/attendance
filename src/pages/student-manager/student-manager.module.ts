import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StudentManagerPage } from './student-manager';

@NgModule({
  declarations: [
    StudentManagerPage,
  ],
  imports: [
    IonicPageModule.forChild(StudentManagerPage),
  ],
})
export class StudentManagerPageModule {}
