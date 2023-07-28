import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css']
})
export class CreateGameComponent {

  selectedValue: any
  constructor(private apiService: ApiService){}
  
  

  createGame(form: NgForm): void{
    if(form.invalid){
      return
    }

    const {name, imageUrl, description, price}: {name: string, imageUrl: string, description: string, price: number} = form.value

    if(name == '' || imageUrl == '' || description == '' || price <= 0 || this.selectedValue == ''){
      return
    }

    
    
    const ownerId = localStorage.getItem('userId')

    const genre = this.selectedValue

    if(typeof genre!= 'string'){
      return
    }
    
    this.apiService.addGame({name, imageUrl, description, price, ownerId, genre})

    form.setValue({
      name: '',
      imageUrl: '',
      description: '',
      price: '',
      genre: ''
    })
  }

}
