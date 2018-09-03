export class Student{
  firstname:string;
  lastname:string;
  studentid:string;
  sessions:Array<string>;
  constructor(firstname,lastname,studentid){
    this.firstname = firstname;
    this.lastname = lastname;
    this.studentid = studentid;
  }
}
