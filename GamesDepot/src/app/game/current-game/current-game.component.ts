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
  isOwner = false
  isLoged = false
  ownerName = ''
  ownerId = ''

  constructor(private AR: ActivatedRoute, private apiService: ApiService, private router: Router, private authService: AuthService){}

  ngOnInit(): void {
    this.getGame()
    this.addView()
    this.isLogedin()
    window.scrollTo(0, 0)
  }

  getGame(): void {
    const gameId = this.AR.snapshot.params['gameId']
    const userId = localStorage.getItem('userId')
    this.apiService.getGameById(gameId).then((res) => {
      this.game = res[0]
      this.game.id = res[1];

      const id = this.game['ownerId']

      if(userId == id){
        this.isOwner = true
      }

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

  addToCart(id: string, name: string){
    sessionStorage.setItem(`${name}`, id)
  }

  isLogedin() {
    if (!!localStorage.getItem('userId')) {
      this.authService.isThisUserExisting(localStorage.getItem('userId')).then(res => this.isLoged = res)
      return
    } else {
      this.isLoged = false
      return
    }
  }

  deleteGame(){
    if(confirm('are you sure you want to delete game ?')){
      const gameId = this.AR.snapshot.params['gameId']
      this.apiService.deleteGame(gameId)
      this.router.navigate([''])
      return
    }
  
  }
}
