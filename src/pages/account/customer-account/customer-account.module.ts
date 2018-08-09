import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerAccountPage } from './customer-account';

@NgModule({
  declarations: [
    CustomerAccountPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerAccountPage),
  ],
})
export class CustomerAccountPageModule {}
