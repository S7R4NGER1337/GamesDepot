import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth: AngularFireAuth) { }

  signIn(email: string, password: string){
    this.fireAuth.signInWithEmailAndPassword(email, password)
  }
  
}
