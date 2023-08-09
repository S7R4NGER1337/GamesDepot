import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth } from 'firebase/auth';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService, private router: Router){}
  

  login(form: NgForm): void{
    if(form.invalid){
      return
    }

    const {email, pass} = form.value
    
    if(email == '' || pass == ''){
      return
    }

    this.authService.login(email, pass)

    // const token: string | null = localStorage.getItem('userId')
    // this.authService.isThisUserExisting(token)
  }
  
}
