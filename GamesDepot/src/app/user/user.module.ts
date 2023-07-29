import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
  ],
  exports: [
    LoginComponent,
    RegisterComponent
  ]
})
export class UserModule { }
