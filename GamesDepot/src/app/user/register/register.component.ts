import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private authService:AuthService, private formBuilder: FormBuilder, private router: Router){}

  registerForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    rePassword: ['', [Validators.required]]
  });


  register(){
    const name: any = this.registerForm.get('name')?.value
    const email: any = this.registerForm.get('email')?.value
    const password: any = this.registerForm.get('password')?.value
    const rePassword: any = this.registerForm.get('rePassword')?.value
    
    if(name == '' || email == '' || password == '' || rePassword == ''){
      alert('There cant be missing fields')
      return
    }
    if(password.length <= 6){
      alert('Password must be at least 6 symbols')
      return
    }
    if(password != rePassword){
      alert('Passwords must match!')
      return
    }
    
    this.authService.register(email, password, name)

  }
  
}
