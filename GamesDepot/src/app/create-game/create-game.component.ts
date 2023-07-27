import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css']
})
export class CreateGameComponent {
  createGame(form: NgForm): void{
    if(form.invalid){
      return
    }

    const value: {name: string, imageUrl: string, description: string, price: number,} = form.value

    if(value.name == '' || value.imageUrl == '' || value.description == '' || value.price <= 0){
      return
    }
    
    console.log(value);
    
    form.setValue({
      name: '',
      imageUrl: '',
      description: '',
      price: '',
    })
  }
}
