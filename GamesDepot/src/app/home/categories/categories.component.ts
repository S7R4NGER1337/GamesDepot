import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent {
  images: any = {
    Action: '',
    Adventure: '',
    Strategy: '',
    Racing: '',
    SportGames: '',
  };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getImages();
  }

  getImages() {
    const gamesArr = ['Action', 'Adventure', 'Strategy', 'Racing', 'SportGames'];
    gamesArr.map((game) => {
        this.apiService.getRandomGame(game).then((res) => {
          this.images[game] = res.imageUrl
      });
    });
  }
}
