import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private fireAuth: AngularFireAuth, private router: Router) {}

  signUp(email: string, password: string) {
    this.fireAuth.createUserWithEmailAndPassword(email, password);
  }

  signIn(email: string, password: string) {
    this.fireAuth.signInWithEmailAndPassword(email, password);
    this.router.navigate(['/home'])
  }

}
