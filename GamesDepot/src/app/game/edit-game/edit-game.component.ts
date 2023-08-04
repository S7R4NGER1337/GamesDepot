import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrls: ['./edit-game.component.css'],
})
export class EditGameComponent implements OnInit {
  game: any = {};
  selectedValue: any;

  constructor(private apiService: ApiService, private AR: ActivatedRoute) {}

  id = this.AR.snapshot.params['gameId'];

  ngOnInit(): void {
    this.getGame(this.id);
  }
  updateGame(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    const {
      name,
      imageUrl,
      description,
      price,
    }: { name: string; imageUrl: string; description: string; price: number } =
      form.value;

    if (
      name == '' ||
      imageUrl == '' ||
      description == '' ||
      price <= 0 ||
      this.selectedValue == ''
    ) {
      return;
    }

    const ownerId = localStorage.getItem('userId');

    const genre = this.selectedValue;

    if (typeof genre != 'string') {
      return;
    }



    form.setValue({
      name: '',
      imageUrl: '',
      description: '',
      price: '',
      genre: '',
    });
  }

  getGame(id: string) {
    this.apiService.getGameById(id).then((res) => {
      this.game = res[0];
    });
  }
}
