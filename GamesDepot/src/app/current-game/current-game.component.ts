import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-current-game',
  templateUrl: './current-game.component.html',
  styleUrls: ['./current-game.component.css']
})
export class CurrentGameComponent implements OnInit{
  game: any = {}

  constructor(private AR: ActivatedRoute, private apiService: ApiService){}

  ngOnInit(): void {
    this.getGame()
    this.addView()
  }

  getGame(): void {
    const gameId = this.AR.snapshot.params['gameId']
    this.apiService.getGameById(gameId).then((res) => {
      this.game = res   
    })
  }

  addView(): void {
    const gameId = this.AR.snapshot.params['gameId']
    this.apiService.addView(gameId)
  }

}
