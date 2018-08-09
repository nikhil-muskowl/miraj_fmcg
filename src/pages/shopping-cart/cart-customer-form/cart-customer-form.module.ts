import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CartCustomerFormPage } from './cart-customer-form';

@NgModule({
  declarations: [
    CartCustomerFormPage,
  ],
  imports: [
    IonicPageModule.forChild(CartCustomerFormPage),
  ],
})
export class CartCustomerFormPageModule {}
