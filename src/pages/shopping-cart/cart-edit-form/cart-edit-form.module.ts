import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CartEditFormPage } from './cart-edit-form';

@NgModule({
  declarations: [
    CartEditFormPage,
  ],
  imports: [
    IonicPageModule.forChild(CartEditFormPage),
  ],
})
export class CartEditFormPageModule {}
