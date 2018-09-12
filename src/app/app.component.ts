import { Component, ViewChild } from '@angular/core';
import { App, Nav, Platform, IonicApp, MenuController, Events  } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { CustomerWishlistPage } from '../pages/account/customer-wishlist/customer-wishlist';
import { CustomerOrderPage } from '../pages/account/customer-order/customer-order';

import { CategoriesPage } from '../pages/products/categories/categories';
import { CustomerAccountPage } from '../pages/account/customer-account/customer-account';

import { ConfigProvider } from '../providers/config/config';
import { CustomerProvider } from '../providers/customer/customer';
import { FollowUsProvider } from '../providers/follow-us/follow-us';

//public
import { TermsAndConditionsPage } from '../pages/public/terms-and-conditions/terms-and-conditions';
import { HelpAndSupportPage } from '../pages/public/help-and-support/help-and-support';
import { NotificationsPage } from '../pages/public/notifications/notifications';
import { ContactUsPage } from '../pages/public/contact-us/contact-us';

import { AlertController, Alert } from 'ionic-angular';

// This is added on 07/09/2018 for No Network Access
import { Network } from '@ionic-native/network';
import { NetworkProvider } from '../providers/network/network';

// This is added on 10/09/2018 for follow-us functionality
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AppAvailability } from '@ionic-native/app-availability';


export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  public alert: Alert;

  public searchInput;
  rootPage: any = TabsPage;
  
  pages: PageInterface[] = [
    { title: 'home', name: 'TabsPage', component: TabsPage, tabComponent: HomePage, index: 0, icon: 'assets/icon/home.png' },
    { title: 'shop by categories', name: 'TabsPage', component: TabsPage, tabComponent: CategoriesPage, index: 1, icon: 'assets/icon/category.png' },
    { title: 'profile', name: 'TabsPage', component: TabsPage, tabComponent: CustomerAccountPage, index: 3, icon: 'assets/icon/Profile.png' },

    { title: 'my wishlist', name: 'CustomerWishlistPage', component: CustomerWishlistPage, icon: 'assets/icon/Wishlist.png' },
    { title: 'my orders', name: 'CustomerOrderPage', component: CustomerOrderPage, icon: 'assets/icon/My Order.png' },
    { title: 'notification', name: 'NotificationsPage', component: NotificationsPage, icon: 'assets/icon/Notifications.png' },
    { title: 'terms & conditions', name: 'TermsAndConditionsPage', component: TermsAndConditionsPage, icon: 'assets/icon/Terms.png' },
    { title: 'help & support', name: 'HelpAndSupportPage', component: HelpAndSupportPage, icon: 'assets/icon/Help.png' },
    { title: 'contact us', name: 'ContactUsPage', component: ContactUsPage, icon: 'assets/icon/Contact.png' },
  ];

  @ViewChild(Nav) nav: Nav;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public configProvider: ConfigProvider,
    private customerProvider: CustomerProvider,
    private followUsProvider: FollowUsProvider,
    public app: App,
    public menu: MenuController,
    public alertCtrl: AlertController,
    public events: Events,
    public network: Network,
    public networkProvider: NetworkProvider,
    private iab: InAppBrowser,
    private appAvailability: AppAvailability,
    //private netService: NetworkServiceProvider
  ) {
    this.initializeApp();
    platform.ready().then(() => {
      this.listenConnection();
    })
  }

  // ionViewWillEnter(){
  //   this.platform.ready().then(() => {
  //     this.listenConnection();
  //   })
  // }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.platform.registerBackButtonAction(() => {
        const overlayView = this.app._appRoot._overlayPortal._views[0];
        if (overlayView && overlayView.dismiss) {
          overlayView.dismiss();
          return;
        }

        let nav = this.app.getActiveNavs()[0];
        let activeView = nav.getActive();
        console.log(activeView);
        if (nav.canGoBack()) {
          nav.pop();
        } else {
          this.exitApp();
        }
      }, 0);
    });
  }

  // This is added on 07/09/2018 for No Network Access //
  private listenConnection(): void {
    this.networkProvider.initializeNetworkEvents();

    // Offline event
    this.events.subscribe('network:offline', () => {
      let alert = this.alertCtrl.create({
        title: "Connection Failed !",
        subTitle: "Please check your network settings.",
        buttons: [{
        text: ("Okay")
        }]
      });
        alert.present();
    });

    // Online event
    this.events.subscribe('network:online', () => {
      let alert = this.alertCtrl.create({
        title: "Network Available..",
        subTitle: "Connected via "+ this.network.type,
        buttons: [{
        text: ("Okay")
        }]
      });
        alert.present();
    });
  }

  exitApp() {
    this.alert = this.alertCtrl.create({
      title: 'Confirm',
      message: 'Do you want to exit?',
      buttons: [
        {
          text: "Cancel",
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: "Yes",
          handler: () => {
            this.platform.exitApp();
          }
        }
      ]
    });

    this.alert.present();
  }

  openPage(page: PageInterface) {
    let params = {};

    // The index is equal to the order of our tabs inside tabs.ts
    if (page.index) {
      params = { tabIndex: page.index };
    }

    // If tabs page is already active just change the tab index
    if (this.nav.getActiveChildNavs().length && page.index != undefined) {
      this.nav.getActiveChildNavs()[0].select(page.index);
    } else {
      // Tabs are not active, so reset the root page 
      // In this case: moving to or from SpecialPage
      this.nav.push(page.component, params);
    }
  }

  isActive(page: PageInterface) {
    // Again the Tabs Navigation
    let childNav = this.nav.getActiveChildNavs()[0];

    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }

    // Fallback needed when there is no active childnav (tabs not active)
    if (this.nav.getActive() && this.nav.getActive().name === page.name) {
      return 'primary';
    }
    return;
  }

  // Added on 07/09/2018 for Follow Us on Socials

  followFacebook(){
    //this.launchExternalApp('fb://', 'com.facebook.katana', 'fb://profile/', 'https://www.facebook.com/', 'mirajfmcg');
    this.launchExternalApp('fb://', 'com.facebook.android', 'fb://profile/', 'https://www.facebook.com/', 'mirajfmcg');
  }

  followInstagram(){
    this.launchExternalApp('instagram://', 'com.instagram.android', 'instagram://user?username=', 'http://instagram.com/', 'miraj_fmcg/');
  }

  followTwitter(){
    this.launchExternalApp('twitter://', 'com.twitter.android', 'twitter://user?screen_name=', 'https://twitter.com/', 'mirajfmcg');
  }

  followLinkedin(){

  }

  followGoogleplus(){
    this.launchExternalApp('googleplus://', 'com.googleplus.android', 'googleplus://user?screen_name=', 'https://plus.google.com/u/0/', '115692487643469865966');
  }

  launchExternalApp(iosSchemaName: string, androidPackageName: string, appUrl: string, httpUrl: string, username: string) {
    let app: string;

    if (this.platform.is('ios')) {
      app = iosSchemaName;
    } else if (this.platform.is('android')) {
      app = androidPackageName;
    } else {
      let browser = this.iab.create(httpUrl + username, '_system');
      return;
    }

    this.appAvailability.check(app).then(
      (yes: boolean) => { // success callback
        let browser = this.iab.create(appUrl + username, '_system');
      },
      (no: boolean) => { // error callback
        let browser = this.iab.create(httpUrl + username, '_system');
      }
    );

  }

}
