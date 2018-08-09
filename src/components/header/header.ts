import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { CustomerAccountPage } from '../../pages/account/customer-account/customer-account';
import { CartPage } from '../../pages/shopping-cart/cart/cart';
import { CustomerWishlistPage } from '../../pages/account/customer-wishlist/customer-wishlist';
import { SearchProductsPage } from '../../pages/products/search-products/search-products';
import { FollowUsProvider } from '../../providers/follow-us/follow-us';

@Component({
  selector: 'header',
  templateUrl: 'header.html'
})
export class HeaderComponent {

  public searchInput;

  constructor(
    public navCtrl: NavController,
    private followUsProvider: FollowUsProvider,
  ) {
  }

  presentActionSheet() {
    this.followUsProvider.presentActionSheet();
  }

  goToAccount() {
    this.navCtrl.push(CustomerAccountPage);
  }

  goToHome() {
    this.navCtrl.setRoot(HomePage);
  }

  goTocart() {
    this.navCtrl.push(CartPage);
  }

  goToWishlist() {
    this.navCtrl.push(CustomerWishlistPage);
  }

  goToSearch() {
    this.navCtrl.push(SearchProductsPage);
  }

  public onSearch(ev: any) {
    this.searchInput = ev.target.value;
    this.navCtrl.push(SearchProductsPage, { search: ev.target.value });
  }

  public onSearchCancel() {
    this.searchInput = '';
  }

}
