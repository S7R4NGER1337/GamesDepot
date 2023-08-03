import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/user/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit{
  isLoged: boolean = false;
  isCartShown = false

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isLogedin()
  }

  logout(): void {
    this.authService.logout();
    this.isLoged = false
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
  
  showCart(){
    this.isCartShown = !this.isCartShown
  }
}
