import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';




@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css']
})

export class TrendingComponent implements OnInit{

  trendingGames = []
  constructor(private apiService: ApiService){}

  ngOnInit(): void {
    this.getTrendingGames()
  }


  getTrendingGames() {
    this.apiService.getTrendingGames().then(res => {
      this.trendingGames = res
    })
  }
}
