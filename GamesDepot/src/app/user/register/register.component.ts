import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private authService:AuthService){}

  email = 'city@gamil.com'
  password ='areWe6chars'
  name = 'peshoWe'
  
  register(){
    this.authService.register(this.email, this.password, this.name)
  }
  
}
