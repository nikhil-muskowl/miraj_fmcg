import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ConfigProvider } from '../config/config';
import { CustomerProvider } from '../customer/customer';

@Injectable()
export class CartProvider {
  public headers = new HttpHeaders();
  public formData: FormData = new FormData();
  public responseData: any;
  private URL;
  constructor(
    public http: HttpClient,
    public customerProvider: CustomerProvider
  ) {
    this.headers.set('Access-Control-Allow-Origin ', '*');
    this.headers.set('Content-Type', 'application/json; charset=utf-8');
  }

  products(): any {
    this.URL = ConfigProvider.BASE_URL_ + 'cart?customer_id=' + this.customerProvider.customer_id + '&postcode=' + this.customerProvider.postcode;
    console.log(this.URL);
    return this.http.get(this.URL,
      {
        headers: this.headers,
      }
    );
  }

  add(data: any): any {
    this.formData = new FormData();
    this.URL = ConfigProvider.BASE_URL_ + 'addcart';
    this.formData.append('customer_id', this.customerProvider.customer_id.toString());
    this.formData.append('product_id', data.product_id);
    this.formData.append('detail_id', data.detail_id);
    this.formData.append('quantity', data.quantity);

    return this.http.post(this.URL,
      this.formData,
      {
        headers: this.headers,
      }
    );
  }

  edit(data: any): any {
    this.formData = new FormData();
    this.URL = ConfigProvider.BASE_URL_ + 'editcart';
    this.formData.append('key', data.cart_id);
    this.formData.append('quantity', data.quantity);

    return this.http.post(this.URL,
      this.formData,
      {
        headers: this.headers,
      }
    );
  }

  remove(data: any): any {
    this.formData = new FormData();
    this.URL = ConfigProvider.BASE_URL_ + 'removecart';
    this.formData.append('key', data.cart_id);

    return this.http.post(this.URL,
      this.formData,
      {
        headers: this.headers,
      }
    );
  }

  getTermCondition() {
    this.URL = ConfigProvider.BASE_URL_ + 'termandcondition';    
    return this.http.get(this.URL,
      {
        headers: this.headers,
      }
    );
  }


}
