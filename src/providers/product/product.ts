import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { ConfigProvider } from '../config/config';

@Injectable()
export class ProductProvider {
  public headers = new HttpHeaders();
  public formData: FormData = new FormData();
  public search;
  private URL;

  public category_id;
  public page;
  public limit;
  public sort;
  public order;


  constructor(public http: HttpClient) {
    this.headers.set('Access-Control-Allow-Origin ', '*');
    this.headers.set('Content-Type', 'application/json; charset=utf-8');
  }

  public categories(): any {
    this.URL = ConfigProvider.BASE_URL_ + 'categories';

    return this.http.get(this.URL,
      {
        headers: this.headers,
      }
    );
  }

  public products(data): any {
    this.category_id = data.category_id;
    this.page = data.page;
    this.limit = data.limit;
    this.sort = data.sort;
    this.order = data.order;

    this.URL = ConfigProvider.BASE_URL_;
    this.URL += 'productbycategory?categoryid=' + this.category_id;

    if (this.page) {
      this.URL += '&pageid=' + this.page;
    }

    if (this.limit) {
      this.URL += '&limit=' + this.limit;
    }

    if (this.sort) {
      this.URL += '&sort=' + this.sort;
    }
    if (this.order) {
      this.URL += '&order=' + this.order;
    }

    return this.http.get(this.URL);
  }

  public product(id: Number): any {
    this.URL = ConfigProvider.BASE_URL_ + 'products?productid=' + id;
    return this.http.get(this.URL,
      {
        headers: this.headers,
      }
    );
  }

  public specialProducts(data): any {
    this.category_id = data.category_id;
    this.page = data.page;
    this.limit = data.limit;
    this.sort = data.sort;
    this.order = data.order;
    this.URL = ConfigProvider.BASE_URL_;
    this.URL += 'specialproducts?categoryid=' + this.category_id;

    if (this.page) {
      this.URL += '&pageid=' + this.page;
    }

    if (this.limit) {
      this.URL += '&limit=' + this.limit;
    }

    if (this.sort) {
      this.URL += '&sort=' + this.sort;
    }
    if (this.order) {
      this.URL += '&order=' + this.order;
    }

    return this.http.get(this.URL);
  }

  public getReviews(product_id): any {
    this.URL = ConfigProvider.BASE_URL_ + 'productreview';
    this.URL += '?product_id=' + product_id;

    return this.http.get(this.URL,
      {
        headers: this.headers,
      }
    );
  }

  public postReviews(product_id, data): any {
    this.formData = new FormData();
    this.formData.append('product_id', product_id);
    this.formData.append('customer_id', ConfigProvider.CUSTOMER_ID.toString());
    this.formData.append('name', data.name);
    this.formData.append('text', data.text);
    this.formData.append('rating', data.rating);

    this.URL = ConfigProvider.BASE_URL_ + 'writereview';

    return this.http.post(this.URL,
      this.formData,
      {
        headers: this.headers,
      }
    );
  }

  public searchProducts(data): any {
    this.search = data.search;
    this.category_id = data.category_id;
    this.page = data.page;
    this.limit = data.limit;
    this.sort = data.sort;
    this.order = data.order;
    this.URL = ConfigProvider.BASE_URL_;
    this.URL += 'productsearch';
    this.URL += '?searchtext=' + this.search;

    if (this.page) {
      this.URL += '&pageid=' + this.page;
    }

    if (this.limit) {
      this.URL += '&limit=' + this.limit;
    }

    if (this.sort) {
      this.URL += '&sort=' + this.sort;
    }
    if (this.order) {
      this.URL += '&order=' + this.order;
    }

    return this.http.get(this.URL);
  }


  public decodeEntities(encodedString) {
    var parser = new DOMParser;
    var dom = parser.parseFromString(
      '<!doctype html><body>' + encodedString,
      'text/html');
    var decodedString = dom.body.textContent;
    return decodedString;
  }

}
