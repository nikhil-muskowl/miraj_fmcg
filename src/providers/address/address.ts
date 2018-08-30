import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ConfigProvider } from '../config/config';

@Injectable()
export class AddressProvider {
  public headers = new HttpHeaders();
  public formData: FormData = new FormData();
  public responseData: any;
  private URL;

  constructor(public http: HttpClient) {
    this.headers.set('Access-Control-Allow-Origin ', '*');
    this.headers.set('Content-Type', 'application/json; charset=utf-8');
  }

  getCountry(): any {
    this.URL = ConfigProvider.BASE_URL_ + 'country';
    return this.http.get(this.URL,
      {
        headers: this.headers,
      }
    );
  }

  getZone(id): any {
    this.URL = ConfigProvider.BASE_URL_ + 'zone?country_id=' + id;
    return this.http.get(this.URL,
      {
        headers: this.headers,
      }
    );
  }

  getDistrict(id): any {
    // this.URL = ConfigProvider.BASE_URL_ + 'district?zone_id=' + id;
    if(id != 0){
      this.URL = ConfigProvider.BASE_URL_ + 'district?zone_id=' + id;
    } else {
      this.URL = ConfigProvider.BASE_URL_ + 'district?zone_id=' + '28';
    }
    return this.http.get(this.URL,
      {
        headers: this.headers,
      }
    );
  }

  getStores(): any {
    this.URL = ConfigProvider.BASE_URL_ + 'stores';
    return this.http.get(this.URL,
      {
        headers: this.headers,
      }
    );
  }

}
