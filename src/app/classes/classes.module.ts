import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ClassesPage } from './classes.page';
import { ClassesDetailPageModule } from '../classes-detail/classes-detail.module';

const routes: Routes = [
  {
    path: '',
    component: ClassesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ClassesPage]
})
export class ClassesPageModule {}
