import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerAccountEditPage } from './customer-account-edit';

@NgModule({
  declarations: [
    CustomerAccountEditPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerAccountEditPage),
  ],
})
export class CustomerAccountEditPageModule {}
