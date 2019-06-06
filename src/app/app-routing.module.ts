import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signup',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  { path: 'signin', loadChildren: './signin/signin.module#SigninPageModule' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'signout', loadChildren: './signout/signout.module#SignoutPageModule' },
  { path: 'classes', loadChildren: './classes/classes.module#ClassesPageModule' },
  { path: 'sessions', loadChildren: './sessions/sessions.module#SessionsPageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },  { path: 'classes-add', loadChildren: './classes-add/classes-add.module#ClassesAddPageModule' },
  { path: 'classes-detail', loadChildren: './classes-detail/classes-detail.module#ClassesDetailPageModule' },
  { path: 'students', loadChildren: './students/students.module#StudentsPageModule' },
  { path: 'class-sessions', loadChildren: './class-sessions/class-sessions.module#ClassSessionsPageModule' },
  { path: 'class-students', loadChildren: './class-students/class-students.module#ClassStudentsPageModule' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
