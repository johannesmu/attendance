import { Injectable } from '@angular/core';

/*
  Generated class for the DateProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DateProvider {

  constructor() {
  }
  getToday(){
    let date:any = new Date();
    let day:string = date.getDate().toString();
    //pad day with preceeding 0
    day = ( day.length == 1 ) ? '0' + day : day;
    let month:string = (date.getMonth() + 1).toString();
    let year:string = date.getFullYear().toString();
    //return in format Y-m-d 2018-12-01
    return this.humaniseDate (year + '-' + month + '-' + day) ;
  }
  getDayName(day:number,full:boolean){
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
  getMonthName(month:number, full:boolean){
    switch(month){
      case 0:
        return (full) ? 'January' : 'Jan';
      case 1:
        return (full) ? 'February' : 'Feb';
      case 2:
        return (full) ? 'March' : 'Mar';
      case 3:
        return (full) ? 'April' : 'Apr';
      case 4:
        return (full) ? 'May' : 'May';
      case 5:
        return (full) ? 'June' : 'Jun';
      case 6:
        return (full) ? 'July' : 'Jul';
      case 7:
        return (full) ? 'August' : 'Aug';
      case 8:
        return (full) ? 'September' : 'Sep';
      case 9:
        return (full) ? 'October' : 'Oct';
      case 10:
        return (full) ? 'November' : 'Nov';
      case 11:
        return (full) ? 'December' : 'Dec';
      default:
        return null;
    }
  }
  humaniseDate( date:string ){
    let dateObj = new Date( date );
    let dayName = this.getDayName( dateObj.getDay() , false );
    let dateNumber = dateObj.getDate();
    let month = this.getMonthName( dateObj.getMonth(), false );
    let year = dateObj.getFullYear();
    return dayName + ' ' + dateNumber + ' ' + month +' '+ year;
  }
}
