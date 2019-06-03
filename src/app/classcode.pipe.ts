import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'classcode'
})
export class ClasscodePipe implements PipeTransform {

  transform(classCode: string): any {
    if( classCode.length > 0 ){
      let chars:Array<string> = classCode.split('');
      chars.forEach((char,index) => {
        if( (index+1) % 3 == 0 ){
          chars.splice( index, 0, '-');
        }
        char.toUpperCase();
      });
      return chars.join();
    }
    else{
      return classCode;
    }
  }

}
