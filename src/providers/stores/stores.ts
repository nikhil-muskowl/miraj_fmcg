import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigProvider } from '../config/config';

@Injectable()
export class StoresProvider {

  public headers = new HttpHeaders();
  public formData: FormData = new FormData();
  public responseData: any;
  private URL;

  constructor(public http: HttpClient) {
    this.headers.set('Access-Control-Allow-Origin ', '*');
    this.headers.set('Content-Type', 'application/json; charset=utf-8'); 
  }

  getStores() {
    this.URL = ConfigProvider.BASE_URL_ + 'getstore?location=kandiwali';
    return this.http.get(this.URL,
      {
        headers: this.headers,
      }
    );
  }

}
