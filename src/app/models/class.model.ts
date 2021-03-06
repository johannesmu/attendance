import { Session } from '../models/session.model';
import { Student } from '../models/student.model';

export interface Class{
  id:string,
  code: string,
  name: string,
  startDate: Date,
  sessions: Array<Session>,
  students: Array<Student>,
}