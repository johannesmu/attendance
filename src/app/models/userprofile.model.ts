export class UserProfile{
  name: string;
  email: string;
  picture: string;
  constructor(){
    this.name = '';
    this.email = '';
    this.picture = '';
  }
  set( name, email, picture ){
    this.name = name;
    this.email = email;
    this.picture = picture;
  }
}