import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user?: User;

  constructor( private http: HttpClient ) { }

  get currentUser():User|undefined{
    if( !this.user ) return undefined;
    return structuredClone( this.user );
  }

  login( formUser: string, password: string ): Observable<User>{
    
    return this.http.get<User>( 'http://grafi-web.com/ciudadlineal/wp-json/wp/v2/publicador/17' )
      .pipe(
          tap( user => this.user = user ),
          tap( user => localStorage.setItem( 'id', user.id.toString() ) ),
          tap( user => localStorage.setItem( 'user', user.user ) )
        );
  }

  checkAuthentication(): Observable<boolean> {
    if ( ! localStorage.getItem('id') ) return of(false);

    const id = localStorage.getItem('id');

    return this.http.get<User>('http://grafi-web.com/ciudadlineal/wp-json/wp/v2/publicador/17')
     .pipe(
      tap( user => this.user = user ),
      map( user => !!user ),
      catchError( err => of(false) )
     );
  }
  
}
