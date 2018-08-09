import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ConfigProvider } from '../config/config';

@Injectable()
export class WishlistProvider {

  public headers = new HttpHeaders();
  public formData: FormData = new FormData();
  public responseData: any;
  private URL;

  constructor(public http: HttpClient) {
    this.headers.set('Access-Control-Allow-Origin ', '*');
    this.headers.set('Content-Type', 'application/json; charset=utf-8');
  }


  getWishlist() {
    this.URL = ConfigProvider.BASE_URL_ + 'wishlist?customer_id=' + ConfigProvider.CUSTOMER_ID;
    return this.http.get(this.URL,
      {
        headers: this.headers,
      }
    );
  }

  addWishlist(data: any): any {
    this.formData = new FormData();
    this.URL = ConfigProvider.BASE_URL_ + 'addwishlist';
    this.formData.append('customer_id', ConfigProvider.CUSTOMER_ID.toString());
    this.formData.append('product_id', data.product_id);
    this.formData.append('detail_id', data.detail_id);
    return this.http.post(this.URL,
      this.formData,
      {
        headers: this.headers,
      }
    );
  }

  removeWishlist(product_id: any): any {
    this.URL = ConfigProvider.BASE_URL_ + 'removewishlist?key=' + product_id + '&customer_id=' + ConfigProvider.CUSTOMER_ID;
    return this.http.get(this.URL,
      {
        headers: this.headers,
      }
    );
  }


}
