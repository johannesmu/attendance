import { Student } from './student';
export class Class{
  id:string;
  classname:string;
  sessions:Array<string>;
  students:Array<Student>;
  constructor(id,name){
    this.id = id;
    this.name = name;
  }
}
