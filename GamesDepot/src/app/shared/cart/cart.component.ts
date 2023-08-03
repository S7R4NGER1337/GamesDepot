import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  games: any = []
  cartInfo: any = {}

  constructor(private apiService: ApiService){}

  ngOnInit(): void {
    this.renderCartItems()
  }

  renderCartItems(){
    const games = Object.values(sessionStorage)
    let price: any = 0
    let gamesCounter: any = 0
    games.forEach(el => {
      if(el == undefined){
        return
      }
      this.apiService.getGameById(el).then(res => {
        const game: any = res[0]
        this.games.push(game) 
        
        price += game['price']
        gamesCounter ++
        this.cartInfo = {price, gamesCounter}
     })
    })
  }
}
