import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user?: User;

  constructor( private http: HttpClient,
               private auth: Auth ) { }

  get currentUser():User|undefined{
    if( !this.user ) return undefined;
    return structuredClone( this.user );
  }

  login( email: string, password: string ){
    return signInWithEmailAndPassword( this.auth, email, password )
      .then( response => {
        console.log( response );
        localStorage.setItem( 'id', response.user.uid );
        localStorage.setItem( 'user', response.user.email ? response.user.email : '' );
      });
  }

  register( email: string, password: string ){
    return createUserWithEmailAndPassword( this.auth, email, password );
  }

  getUsersList(){
    
  }

  checkAuthentication(): Observable<boolean> {
    const id = localStorage.getItem('id');

    if ( ! id ) return of(false);
    return of( true );
  }
  
}
