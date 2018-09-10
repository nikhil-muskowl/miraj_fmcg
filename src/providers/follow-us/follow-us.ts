import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActionSheetController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AppAvailability } from '@ionic-native/app-availability';
import { Platform } from 'ionic-angular';
@Injectable()
export class FollowUsProvider {

  constructor(
    public http: HttpClient,
    private appAvailability: AppAvailability,
    public actionSheetCtrl: ActionSheetController,
    private iab: InAppBrowser,
    private platform: Platform,
  ) {

  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Connect with us',
      buttons: [
        {
          text: 'Facebook',
          icon: 'logo-facebook',
          handler: () => {
           // this.launchExternalApp('fb://', 'com.facebook.katana', 'fb://profile/', 'https://www.facebook.com/', '963940166963050');
            this.launchExternalApp('fb://', 'com.facebook.katana', 'fb://profile/', 'https://www.facebook.com/', 'mirajfmcg');
          }
        }, {
          text: 'Google Plus',
          icon: 'logo-googleplus',
          handler: () => {
           // this.launchExternalApp('googleplus://', 'com.googleplus.android', 'googleplus://user?screen_name=', 'https://googleplus.com/', '');
            this.launchExternalApp('googleplus://', 'com.googleplus.android', 'googleplus://user?screen_name=', 'https://plus.google.com/u/0/', '115692487643469865966');
          }
        },
        {
          text: 'Twitter',
          icon: 'logo-twitter',
          handler: () => {
           // this.launchExternalApp('twitter://', 'com.twitter.android', 'twitter://user?screen_name=', 'https://twitter.com/', '');
            this.launchExternalApp('twitter://', 'com.twitter.android', 'twitter://user?screen_name=', 'https://twitter.com/', 'mirajfmcg');
          }
        },
        {
          text: 'Instagram',
          icon: 'logo-instagram',
          handler: () => {
           // this.launchExternalApp('instagram://', 'com.instagram.android', 'instagram://user?username=', 'http://instagram.com/miraj_developer', '')
            this.launchExternalApp('instagram://', 'com.instagram.android', 'instagram://user?username=', 'http://instagram.com/', 'miraj_fmcg/')
          }
        }
      ]
    });
    actionSheet.present();
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
