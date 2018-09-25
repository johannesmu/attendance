import { Student } from './student';
export class Session{
  date:string;
  attendees:Array<Student>;
  constructor(date){
    this.date = date;
  }
}
