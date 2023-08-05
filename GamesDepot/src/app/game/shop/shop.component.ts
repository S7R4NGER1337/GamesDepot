import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  
  allGames: any = []
  
  constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService, private router: Router){}
  
  ngOnInit(): void {
    this.renderGames()
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  
  page = 1
  category = ''

  renderGames(){
    let page = 1
    let genre: any = ''

    this.activatedRoute.queryParamMap.subscribe(params => {
      page = Number(params.get('page'))
      this.page = page
    })
    this.activatedRoute.queryParamMap.subscribe(params => {
      genre = params.get('category')
      this.category = genre
    })
    this.activatedRoute.queryParamMap.subscribe(params => {
      if(params.keys[0] == 'category'){
        this.apiService.getGamesByCategory(genre, page).then(res => this.allGames = res)
      } else {
        this.apiService.getAllGames(page).then(res => this.allGames = res)
      }
    })
   
  }
}
