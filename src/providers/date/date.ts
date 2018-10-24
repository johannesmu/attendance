import { Injectable } from '@angular/core';

/*
  Generated class for the DateProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DateProvider {

  constructor() {
    console.log('Hello DateProvider Provider');
  }
  getToday(){
    let date:any = new Date();
    let day:string = date.getDate().toString();
    //pad day with preceeding 0
    day = ( day.length == 1 ) ? '0' + day : day;
    let month:string = (date.getMonth() + 1).toString();
    let year:string = date.getFullYear().toString();
    //return in format Y-m-d 2018-12-01
    return year + '-' + month + '-' + day ;
  }
  getDayName(date:string,full:boolean){
    let day:number = Number( new Date(date).getDay() );
    switch( day ){
      case 0:
        return (full) ? 'Sunday' : 'Sun';
      case 1:
        return (full) ? 'Monday' : 'Mon';
      case 2:
        return (full) ? 'Tuesday' : 'Tue';
      case 3:
        return (full) ? 'Wednesday' : 'Wed';
      case 4:
        return (full) ? 'Thursday' : 'Thu';
      case 5:
        return (full) ? 'Friday' : 'Fri';
      case 6:
        return (full) ? 'Saturday' : 'Sat';
      default:
        return null;
    }
  }
  humaniseDate( date:string ){
    let dateObj = new Date( date );
    let dayName = this.getDayName( dateObj.getDay().toString() , false );
    let dateNumber = dateObj.getDate();
    let month = dateObj.getMonth();
  }
}
