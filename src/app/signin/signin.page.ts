import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  signInForm:FormGroup;
  constructor(
    private fB:FormBuilder,
    private auth:AuthService,
    private router:Router
  ) { }

  ngOnInit() {
    this.signInForm = this.fB.group({
      email: ['',[ Validators.required, Validators.email ]],
      password: ['', [Validators.required, Validators.minLength(6) ] ]
    });
  }

  signIn(){
    this.auth.signIn( this.signInForm.value.email, this.signInForm.value.password )
    .then( (user) => {
      //signin successful
      this.router.navigate(['/home']);
    })
    .catch((error) => {
      console.log(error);
    });
  }
}
