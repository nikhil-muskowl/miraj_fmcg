import { Component } from '@angular/core';
import { CartProvider } from '../../providers/cart/cart';
import { LoadingProvider } from '../../providers/loading/loading';
@Component({
  selector: 'cart-terms',
  templateUrl: 'cart-terms.html'
})
export class CartTermsComponent {

  text: string;
  public terms;
  private responseData;
  constructor( private cartProvider: CartProvider,private loadingProvider: LoadingProvider,) {    
    this.text = 'Cart Summary';
    this.getTerms();
  }

  public getTerms(){
    this.loadingProvider.present();
    this.cartProvider.getTermCondition().subscribe(
      response => {
        if (response) {
          // console.log(response);
          this.responseData=response;
          this.terms = this.responseData.terms;             
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
