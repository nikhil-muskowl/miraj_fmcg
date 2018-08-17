import { Component } from '@angular/core';
import { CartProvider } from '../../providers/cart/cart';
import { LoadingProvider } from '../../providers/loading/loading';

@Component({
  selector: 'cart-summary',
  templateUrl: 'cart-summary.html'
})
export class CartSummaryComponent {

  text: string;
  public products;
  public totals;
  public hasProducts;


  constructor(private cartProvider: CartProvider, private loadingProvider: LoadingProvider) {
    this.text = 'Cart Summary';
    this.getProducts();
  }


  public getProducts() {
    this.loadingProvider.present();
    this.cartProvider.products().subscribe(
      response => {
        if (response) {
          // console.log(response);
          this.products = response.products;
          this.totals = response.totals;       
          if (this.products && this.products.length > 0) {
            this.hasProducts = true;
          } else {
            this.hasProducts = false;
          }
        }
      },
      err => console.error(err),
      () => {
        this.loadingProvider.dismiss();
      }
    );
    return event;
  }

}
