import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private authService:AuthService){}

  email = 'iLoveMyJob@gmail.com'
  password ='loaclhost4200'
  
  register(){
    this.authService.signUp(this.email, this.password)
  }
}
