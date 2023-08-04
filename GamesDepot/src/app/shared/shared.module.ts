import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { CartComponent } from './cart/cart.component';
import { NgxPayPalModule } from 'ngx-paypal';



@NgModule({
  declarations: [
    LoaderComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    NgxPayPalModule,
  ],
  exports: [
    LoaderComponent,
    CartComponent
  ]
})
export class SharedModule { }
