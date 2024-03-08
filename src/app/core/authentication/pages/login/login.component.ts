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
loading: boolean = false;
loginError: boolean = false;
msgError: string = '';

public loginForm: FormGroup = this.fb.group({
  username: ['', [Validators.required]], 
  password: ['', [Validators.required]]
});

constructor( 
  private fb: FormBuilder,
  private AuthService: AuthService,
  private router: Router
  ){}

onLogin(){

  this.loading = true;

  if( this.loginForm.invalid ) {
    this.loading = false;
    this.msgError = 'Hay errores en los campos';
    this.loginError = true;
    return;
  }

  this.AuthService.login( this.loginForm.value.username, this.loginForm.value.password )
  .then(
    response => this.router.navigate(['admin'])
  )
  .catch( error => {
    this.loading = false;
    if( error.code === 'auth/invalid-email' ) this.msgError = 'No existe el usuario';
    if( error.code === 'auth/invalid-credential' ) this.msgError = 'Contraseña incorrecta';
    if( error.code !== 'auth/invalid-credential' && error.code !== 'auth/invalid-email' ) this.msgError = error.code;
    this.loginError = true;
  });

}

}
