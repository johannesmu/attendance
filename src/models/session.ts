
export class Session{
  date:string;
  start:string;
  end:string;
  room:string;
  sessionid:string;
  constructor(date,start,end,room){
    this.date = date;
    this.start = start;
    this.end = end;
    this.room = room;
    this.sessionid = date.replace(/-/g,'') + start.replace(':','');
  }
}
