import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  games: any = []
  constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService, private router: Router){}

  ngOnInit(): void {
    this.renderGames()
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  renderGames(){
    let page = 1
    this.activatedRoute.queryParamMap.subscribe(params => {
      page = Number(params.get('page'))
    })
    
    this.apiService.getAllGames(page).then(res => {
      this.games = res
    })
   
  }
}
