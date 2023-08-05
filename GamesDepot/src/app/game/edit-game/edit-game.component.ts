import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrls: ['./edit-game.component.css'],
})
export class EditGameComponent implements OnInit {
  game: any = {};
  id = this.AR.snapshot.params['gameId'];

  constructor(
    private apiService: ApiService,
    private AR: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getGame(this.id);
  }

  submitForm = this.formBuilder.group({
    name: [this.game.name, [Validators.required]],
    imageUrl: [this.game.imageUrl, [Validators.required]],
    price: [this.game.price, [Validators.required]],
    genre: [this.game.genre, [Validators.required]],
    description: [this.game.description, [Validators.required]],
  });

  onSubmit(): void {
    const name = this.submitForm.get('name')?.value;
    const imageUrl = this.submitForm.get('imageUrl')?.value;
    const price = this.submitForm.get('price')?.value;
    const genre = this.submitForm.get('genre')?.value;
    const description = this.submitForm.get('description')?.value;
    if (
      name == '' ||
      imageUrl == '' ||
      price == 0 ||
      genre == '' ||
      description == ''
    ) {
      alert("There can't be empty field");
      return;
    } else {
      this.apiService.updateGame(this.id, {name, imageUrl, price, genre, description});
    }
  }

  getGame(id: string) {
    this.apiService.getGameById(id).then((res) => {
      this.game = res[0];

      this.submitForm = this.formBuilder.group({
        name: [this.game.name, [Validators.required]],
        imageUrl: [this.game.imageUrl, [Validators.required]],
        price: [this.game.price, [Validators.required]],
        genre: [this.game.genre, [Validators.required]],
        description: [this.game.description, [Validators.required]],
      });
    });
  }
}
