import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { CartComponent } from './cart/cart.component';



@NgModule({
  declarations: [
    LoaderComponent,
    CartComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoaderComponent,
    CartComponent
  ]
})
export class SharedModule { }
