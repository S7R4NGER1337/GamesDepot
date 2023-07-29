import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private fireAuth: AngularFireAuth, private router: Router) { }

  signUp(email: string, password: string) {
    this.fireAuth.createUserWithEmailAndPassword(email, password);
  }

  signIn(email: string, password: string) {
    this.fireAuth.signInWithEmailAndPassword(email, password).then((res) => {
      console.log('log this' + res.user?.getIdToken);
    });
    this.router.navigate(['/home']);
  }

  register(email: string, password: string) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  }

  login(email: string, password: string) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem('userID', user.uid);
        this.router.navigate(['/home'])
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  }
}
