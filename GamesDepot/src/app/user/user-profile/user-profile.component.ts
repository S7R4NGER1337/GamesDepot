import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{

  user = {
    name: '',
    email: '',
    games: 0
  }

  games = []
  constructor(private AR: ActivatedRoute, private AuthService: AuthService, private apiService: ApiService){}

  ngOnInit(): void {
    this.loadContent()
  }

  loadContent():void {
    const id = this.AR.snapshot.params['userId']
    this.AuthService.getUerDataById(id).then(res => {
      this.user = res[0]
      this.apiService.getGameByOwnerId(id).then((res) => {
        this.games = res
        this.user.games = res.length
      })
    }).catch(

    )
  }

}
