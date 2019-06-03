import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ClassesAddPage } from './classes-add.page';
import { ClasscodeModule } from '../classcode/classcode.module';

const routes: Routes = [
  {
    path: '',
    component: ClassesAddPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    ClasscodeModule.forRoot()
  ],
  declarations: [ClassesAddPage]
})
export class ClassesAddPageModule {}
