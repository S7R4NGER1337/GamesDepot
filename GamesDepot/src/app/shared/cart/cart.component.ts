import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  price = 0

  public payPalConfig?: IPayPalConfig;
  showSuccess = false
  showCancel = false
  showError = false

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
        this.price += game['price']
        gamesCounter++;
        this.cartInfo = { price, gamesCounter };
      });
    });
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'sb',
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
        color: 'blue'
      },
      onApprove: (data, actions) => {
        console.log(
          'onApprove - transaction was approved, but not authorized',
          data,
          actions
        );
        sessionStorage.clear()

        //TODO alert game codes
        this.router.navigate(['home'])
        
        actions.order.get().then((details: any) => {
          console.log(
            'onApprove - you can get full order details inside onApprove: ',
            details
          );
        });
      },
      onClientAuthorization: (data) => {
        console.log(
          'onClientAuthorization - you should probably inform your server about completed transaction at this point',
          data
        );
        this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
        this.router.navigate(['home'])
        this.showCancel = true;
      },
      onError: (err) => {
        console.log('OnError', err);
        this.showError = true;
      },
    };
  }
}
