import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClasscodePipe } from '../classcode.pipe';

@NgModule({
  declarations: [ ClasscodePipe ],
  imports: [
    CommonModule
  ],
  exports: [ ClasscodePipe ]
})
export class ClasscodeModule { 
  static forRoot() {
    return {
        ngModule: ClasscodeModule,
        providers: [],
    };
  }
}
