import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CartSuccessPage } from './cart-success';

@NgModule({
  declarations: [
    CartSuccessPage,
  ],
  imports: [
    IonicPageModule.forChild(CartSuccessPage),
  ],
})
export class CartSuccessPageModule {}
