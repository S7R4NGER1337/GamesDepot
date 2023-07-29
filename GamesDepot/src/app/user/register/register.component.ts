import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private authService:AuthService){}

  email = 'chechingNewFunctionality@gamil.com'
  password ='areWe6chars'
  
  register(){
    this.authService.register(this.email, this.password)
  }
}
