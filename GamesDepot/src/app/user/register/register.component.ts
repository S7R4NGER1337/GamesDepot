import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private authService:AuthService){}

  email = 'testingregister@gmail.com'
  password ='testingregister'
  
  register(){
    this.authService.signUp(this.email, this.password)
  }
}
