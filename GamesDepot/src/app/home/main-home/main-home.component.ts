import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-main-home',
  templateUrl: './main-home.component.html',
  styleUrls: ['./main-home.component.css']
})
export class MainHomeComponent implements OnInit{

  gameObj: any = {}
  isLoading: boolean = true

  constructor(private apiService: ApiService){}

  ngOnInit(): void {
    this.getRandomGame()
    window.scrollTo(0, 0)
  }

  getRandomGame():void{
    const gamesArr = ['action', 'adventure', 'strategy', 'racing', 'sportgames']
    const randomNumber = Math.floor(Math.random() * 5);
    const randomGame = gamesArr[randomNumber];

    this.apiService.getRandomGame(randomGame).then(res => {
    
      res.forEach(game => {
        this.gameObj = game
      })
      this.isLoading = false
    })
  }
}
