import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { AuthService } from 'src/app/user/auth.service';
import { limitToFirst } from 'firebase/database';

@Component({
  selector: 'app-current-game',
  templateUrl: './current-game.component.html',
  styleUrls: ['./current-game.component.css']
})
export class CurrentGameComponent implements OnInit{
  game: any = {}
  ownerName = ''
  ownerId = ''

  constructor(private AR: ActivatedRoute, private apiService: ApiService, private router: Router, private authService: AuthService){}

  ngOnInit(): void {
    this.getGame()
    this.addView()
  }

  getGame(): void {
    const gameId = this.AR.snapshot.params['gameId']
    this.apiService.getGameById(gameId).then((res) => {
      this.game = res
      const id = this.game['ownerId'].slice(1, -1)

      this.authService.getUerDataById(id).then((res) => {
        this.ownerName = res[0].name      
        this.ownerId = res[0].id
      })
    })
  }

  addView(): void {
    const gameId = this.AR.snapshot.params['gameId']
    this.apiService.addView(gameId).catch(err => this.router.navigate(['home']))
  }

}
