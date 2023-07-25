import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Game } from 'src/app/models/game';



@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css']
})

export class TrendingComponent {
  
  constructor(private apiService: ApiService ){}


  userId = localStorage.getItem('userId')

  test: Game = {name: 'da', imageUrl: 'we', description: 'razbrah', price: 1, ownerId: this.userId || undefined }

  addGame(game: Game){
    this.apiService.addGame(this.test)
  }

}
