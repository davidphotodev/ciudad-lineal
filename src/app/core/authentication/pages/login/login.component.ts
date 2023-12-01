import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

username: string = '';
password: string = '';
loginError: boolean = false;

public loginForm: FormGroup = this.fb.group({
  username: ['', Validators.required], 
  password: ['', Validators.required]
});;

constructor( 
  private fb: FormBuilder,
  private AuthService: AuthService,
  private router: Router
  ){}

onLogin( user:string, pass:string ){

  if( user != 'socrates' || pass != '17939317' ) {
    this.loginError = true;
    return;
  }

  this.AuthService.login( user, pass )
    .subscribe( user => {
      this.router.navigate(['admin'])
    })

}

}
