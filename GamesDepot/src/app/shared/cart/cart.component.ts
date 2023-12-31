import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  games: any = [];
  cartInfo: any = {};
  price = 0;

  public payPalConfig?: IPayPalConfig;
  showSuccess = false;
  showCancel = false;
  showError = false;

  @ViewChild('paymentRef', { static: true }) paymentRef!: ElementRef;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.renderCartItems();
    this.initConfig();
  }

  renderCartItems() {
    const games = Object.values(sessionStorage);
    let price: any = 0;
    let gamesCounter: any = 0;
    games.forEach((el) => {
      if (el == undefined) {
        return;
      }
      this.apiService.getGameById(el).then((res) => {
        const game: any = res[0];
        this.games.push(game);

        price += game['price'];
        this.price += game['price'];
        gamesCounter++;
        this.cartInfo = { price, gamesCounter };
      });
    });
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'AY72qmqTYjiDEgAOw5_Jp2Zk08kj6aIeiBt5oefmh5M533a9c4jOiTz3_CDMKSh5sfIwjySGIZHxNNCE',
      createOrderOnClient: (data) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'EUR',
                value: this.price.toString(),
                breakdown: {
                  item_total: {
                    currency_code: 'EUR',
                    value: this.price.toString(),
                  },
                },
              },
            },
          ],
        },
      advanced: {
        commit: 'true',
      },
      style: {
        layout: 'horizontal',
        label: 'paypal',
        color: 'blue',
      },
      onApprove: (data, actions) => {
        actions.order.get().then((details: any) => {

        });
      },
      onClientAuthorization: (data) => {

        let codes = ''

        this.games.forEach((game: any) => {    
          codes += `
          ${game.name}: ${game.code}`        
          this.apiService.deleteGame(game.id)
        })

        confirm(codes)
        sessionStorage.clear();
        window.location.reload()
        this.router.navigate(['/home'])
        
        this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
        this.router.navigate(['home']);
        this.showCancel = true;
      },
      onError: (err) => {
        console.log('OnError', err);
        this.showError = true;
      },
    };
  }
}
