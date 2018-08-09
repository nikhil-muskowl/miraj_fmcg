import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerChangePasswordPage } from './customer-change-password';

@NgModule({
  declarations: [
    CustomerChangePasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerChangePasswordPage),
  ],
})
export class CustomerChangePasswordPageModule {}
