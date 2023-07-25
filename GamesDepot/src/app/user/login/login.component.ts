import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService, private afAuth: AngularFireAuth){}

  email = 'proba@gmail.com'
  password ='testingregister'

  login(){
    this.authService.signIn(this.email, this.password)
    alert('successfully loged in')
  }

}
