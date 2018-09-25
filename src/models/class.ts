import { Student } from './student';
import { Session } from './session';
export class Class{
  id:string;
  classname:string;
  sessions:Array<Session>;
  students:Array<Student>;
  constructor(id,name){
    this.id = id;
    this.classname = name;
  }
}
