import { Student } from './student';
import { Session } from './session';

export class Class{
  classid:string;
  classname:string;
  classcode:string;
  sessions:Array<Session>;
  students:Array<Student>;
  constructor(name,code){
    this.classname = name;
    this.classcode = code;
    this.classid = this.generateId();
  }
  generateId(){
    return Math.random().toString( 36 ).replace('0.','');
  }
  addStudent(id,first,last){
    let st = new Student(id,first,last);
    this.students.push( st );
  }
}
