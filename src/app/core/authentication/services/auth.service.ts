import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Auth, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, updateProfile } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user?: User;

  constructor( private http: HttpClient,
               private auth: Auth ) { }

  getCurrentUser(){
    const auth = getAuth();
    const user = auth.currentUser;
    return user;
  }

  async login( email: string, password: string ){
    return signInWithEmailAndPassword( this.auth, email, password )
      .then( response => {
        console.log( response );
        localStorage.setItem( 'id', response.user.uid );
        localStorage.setItem( 'email', response.user.email ? response.user.email : '' );
        localStorage.setItem( 'name', response.user.displayName ? response.user.displayName : '' );
      });
  }

  async logout(){
    return signOut( this.auth )
      .then(
        () => localStorage.clear()
      )
  }

  async register( email: string, password: string, name: string ){
    return createUserWithEmailAndPassword( this.auth, email, password )
      .then(
        response => {
          updateProfile( response.user, {
            displayName: name
          });
        }
      );
  }

  checkAuthentication(): Observable<boolean> {
    const id = localStorage.getItem('id');

    if ( ! id ) return of(false);
    return of( true );
  }
  
}
