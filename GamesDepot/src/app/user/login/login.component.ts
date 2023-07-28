import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth } from 'firebase/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService, private afAuth: AngularFireAuth){}

  email = 'iLoveMyJob@gmail.com'
  password ='loaclhost4200'

  auth = getAuth();
  userId = this.auth.currentUser?.uid

  login(){
    this.authService.signIn(this.email, this.password)
    localStorage.setItem('userId', JSON.stringify(this.userId));
  }
  
}
