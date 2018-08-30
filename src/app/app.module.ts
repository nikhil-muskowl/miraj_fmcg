import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { HttpClientModule } from "@angular/common/http";

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AppAvailability } from '@ionic-native/app-availability';
import { Ionic2RatingModule } from 'ionic2-rating';
import { IonicStorageModule } from '@ionic/storage';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { DatePicker } from '@ionic-native/date-picker';
import { SocialSharing } from '@ionic-native/social-sharing';


// pages
import { HomePage } from '../pages/home/home';
import { StoresPage } from '../pages/stores/stores';
import { TabsPage } from '../pages/tabs/tabs';
//public
import { TermsAndConditionsPage } from '../pages/public/terms-and-conditions/terms-and-conditions';
import { HelpAndSupportPage } from '../pages/public/help-and-support/help-and-support';
import { NotificationsPage } from '../pages/public/notifications/notifications';
import { ContactUsPage } from '../pages/public/contact-us/contact-us';

//products
import { CategoriesPage } from '../pages/products/categories/categories';
import { CategoryProductsPage } from '../pages/products/category-products/category-products';
import { ProductPage } from '../pages/products/product/product';
import { SpecialProductsPage } from '../pages/products/special-products/special-products';
import { SearchProductsPage } from '../pages/products/search-products/search-products';


// account
import { CustomerLoginPage } from '../pages/account/customer-login/customer-login';
import { CustomerRegisterPage } from '../pages/account/customer-register/customer-register';
import { CustomerAccountPage } from '../pages/account/customer-account/customer-account';
import { CustomerOrderPage } from '../pages/account/customer-order/customer-order';
import { CustomerOrderViewPage } from '../pages/account/customer-order-view/customer-order-view';
import { CustomerWishlistPage } from '../pages/account/customer-wishlist/customer-wishlist';
import { CustomerAccountEditPage } from '../pages/account/customer-account-edit/customer-account-edit';
import { CustomerChangePasswordPage } from '../pages/account/customer-change-password/customer-change-password';
import { CustomerRequestPage } from '../pages/account/customer-request/customer-request';
import { CustomerRequestsPage } from '../pages/account/customer-requests/customer-requests';

// shopping-cart
import { CartPage } from '../pages/shopping-cart/cart/cart';
import { PaymentAddressPage } from '../pages/shopping-cart/payment-address/payment-address';
import { ShippingAddressPage } from '../pages/shopping-cart/shipping-address/shipping-address';
import { OrderConfirmPage } from '../pages/shopping-cart/order-confirm/order-confirm';
import { CartEditFormPage } from '../pages/shopping-cart/cart-edit-form/cart-edit-form';
import { CartCustomerFormPage } from '../pages/shopping-cart/cart-customer-form/cart-customer-form';
import { CartSuccessPage } from '../pages/shopping-cart/cart-success/cart-success';

// components
import { HeaderComponent } from '../components/header/header';
import { CartSummaryComponent } from '../components/cart-summary/cart-summary';
import { CartTermsComponent } from '../components/cart-terms/cart-terms';
import { ProductReviewComponent } from '../components/product-review/product-review';


// providers
import { FollowUsProvider } from '../providers/follow-us/follow-us';
import { ConfigProvider } from '../providers/config/config';

import { ProductProvider } from '../providers/product/product';
import { CustomerProvider } from '../providers/customer/customer';
import { AlertProvider } from '../providers/alert/alert';
import { LoadingProvider } from '../providers/loading/loading';
import { AddressProvider } from '../providers/address/address';
import { ToastProvider } from '../providers/toast/toast';
import { ModalProvider } from '../providers/modal/modal';
import { CartProvider } from '../providers/cart/cart';
import { OrderProvider } from '../providers/order/order';
import { WishlistProvider } from '../providers/wishlist/wishlist';
import { HomeProvider } from '../providers/home/home';
import { InformationProvider } from '../providers/information/information';

import { ScrollHideDirective } from '../directives/scroll-hide/scroll-hide';
import { StoresProvider } from '../providers/stores/stores';
import { SocialSharingProvider } from '../providers/social-sharing/social-sharing';


@NgModule({

  declarations: [
    MyApp,
    HomePage,
    StoresPage,
    TabsPage,
    CategoriesPage,
    CategoryProductsPage,
    ProductPage,
    CustomerOrderPage,
    CustomerWishlistPage,
    CustomerLoginPage,
    CustomerRegisterPage,
    CustomerAccountPage,
    HeaderComponent,
    CartPage,
    PaymentAddressPage,
    ShippingAddressPage,
    OrderConfirmPage,
    CartEditFormPage,
    CartCustomerFormPage,
    CartSuccessPage,
    CustomerOrderViewPage,
    ScrollHideDirective,
    SpecialProductsPage,
    ProductReviewComponent,
    TermsAndConditionsPage,
    HelpAndSupportPage,
    NotificationsPage,
    ContactUsPage,
    SearchProductsPage,
    CustomerAccountEditPage,
    CustomerChangePasswordPage,
    CartSummaryComponent,
    CartTermsComponent,
    CustomerRequestPage,
    CustomerRequestsPage
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    Ionic2RatingModule,
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp,],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    StoresPage,
    CategoriesPage,
    CategoryProductsPage,
    ProductPage,
    CustomerLoginPage,
    CustomerOrderPage,
    CustomerWishlistPage,
    CustomerRegisterPage,
    CustomerAccountPage,
    HeaderComponent,
    CartPage,
    PaymentAddressPage,
    ShippingAddressPage,
    OrderConfirmPage,
    CartEditFormPage,
    CartCustomerFormPage,
    CartSuccessPage,
    CustomerOrderViewPage,
    SpecialProductsPage,
    ProductReviewComponent,
    TermsAndConditionsPage,
    HelpAndSupportPage,
    NotificationsPage,
    ContactUsPage,
    SearchProductsPage,
    CustomerAccountEditPage,
    CustomerChangePasswordPage,
    CartSummaryComponent,
    CartTermsComponent,
    CustomerRequestPage,
    CustomerRequestsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    AppAvailability,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ConfigProvider,
    FollowUsProvider,
    ProductProvider,
    CustomerProvider,
    AlertProvider,
    LoadingProvider,
    AddressProvider,
    ToastProvider,
    ModalProvider,
    CartProvider,
    OrderProvider,
    WishlistProvider,
    HomeProvider,
    InformationProvider,
    StoresProvider,
    DatePicker,
    SocialSharing,
    SocialSharingProvider
  ]
})
export class AppModule { }
