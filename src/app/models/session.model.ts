import { Student } from '../models/student.model';
export interface Session{
  id:string,
  startTime:Date,
  endTime:Date,
  attendees:Array<Student>
}