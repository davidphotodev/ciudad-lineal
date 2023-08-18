import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user?: User;

  constructor() { }

  get currentUser():User|undefined{
    if( !this.user ) return undefined;
    return structuredClone( this.user );
  }

}
