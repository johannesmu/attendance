export interface Session{
  sid:string,
  startTime:Date,
  endTime:Date,
  attendees:Array<Student>
}