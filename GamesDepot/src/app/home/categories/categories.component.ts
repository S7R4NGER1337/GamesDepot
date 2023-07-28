import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent {
  images = { action: '', adventure: '', strategy: '', racing: '', sport: '' };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getRandomGame('Action').then((res) => {
      this.images.action = res.imageUrl
    })

    this.apiService.getRandomGame('Adventure').then((res) => {
      this.images.adventure = res.imageUrl
    })

    this.apiService.getRandomGame('Strategy').then((res) => {
      this.images.strategy = res.imageUrl
    })

    this.apiService.getRandomGame('Racing').then((res) => {
      this.images.racing = res.imageUrl
    })

    this.apiService.getRandomGame('Sport-Games').then((res) => {
      this.images.sport = res.imageUrl
    })
  }
}
