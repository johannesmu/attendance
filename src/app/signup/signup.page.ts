import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signUpForm:FormGroup;
  constructor(
    private fB:FormBuilder,
    private auth:AuthService,
    private router:Router
  ) { }

  ngOnInit() {
    this.signUpForm = this.fB.group({
      email: ['',[ Validators.required, Validators.email ]],
      password: ['', [Validators.required, Validators.minLength(6) ] ]
    });
    //check for auth status
    this.auth.authState.subscribe( (user) => {
      if( user ){
        this.router.navigate(['/home']);
      }
    });
  }

  createAccount(){
    this.auth.signUp( this.signUpForm.value.email, this.signUpForm.value.password )
    .then( (data) => {
      this.router.navigate(['/home']);
    })
    .catch( (error) => {
      console.log(error);
    });
  }
}
