import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Platform } from 'ionic-angular';
import { ConfigProvider } from '../config/config';
import { Storage } from '@ionic/storage';

@Injectable()
export class HomeProvider {
  public headers = new HttpHeaders();
  public formData: FormData = new FormData();
  public responseData: any;
  private URL;

  constructor(public http: HttpClient,
    public storage: Storage,
    public platform: Platform, ) {

    this.headers.set('Access-Control-Allow-Origin ', '*');
    this.headers.set('Content-Type', 'application/json; charset=utf-8');
  }

  gethomepageImages() {
    this.URL = ConfigProvider.BASE_URL_ + 'homepageimage';
    return this.http.get(this.URL,
      {
        headers: this.headers,
      }
    );
  }
}
