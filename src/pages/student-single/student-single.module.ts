import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StudentSinglePage } from './student-single';

@NgModule({
  declarations: [
    StudentSinglePage,
  ],
  imports: [
    IonicPageModule.forChild(StudentSinglePage),
  ],
})
export class StudentSinglePageModule {}
