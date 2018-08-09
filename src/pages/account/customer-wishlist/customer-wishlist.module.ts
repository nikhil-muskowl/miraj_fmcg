import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerWishlistPage } from './customer-wishlist';

@NgModule({
  declarations: [
    CustomerWishlistPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerWishlistPage),
  ],
})
export class CustomerWishlistPageModule {}
