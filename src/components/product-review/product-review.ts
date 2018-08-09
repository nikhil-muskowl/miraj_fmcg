import { Component, Input } from '@angular/core';
import { ProductProvider } from '../../providers/product/product';
import { LoadingProvider } from '../../providers/loading/loading';
import { AlertProvider } from '../../providers/alert/alert';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'product-review',
  templateUrl: 'product-review.html'
})
export class ProductReviewComponent {
  @Input('productid') product_id: string;

  text: string;
  public reviews;
  public pagination;
  public results;

  public rateValue;

  submitAttempt;
  reviewForm: FormGroup;
  public formData: any;
  public status;
  public message;
  public responseData;
  public error_name = 'field is required';
  public error_text = 'field is required';
  public error_rating = 'field is required';
  public success;
  public error;

  constructor(
    public formBuilder: FormBuilder,
    public productProvider: ProductProvider,
    public loadingProvider: LoadingProvider,
    public alertProvider: AlertProvider
  ) {
    this.text = 'Reviews';
  }

  ngOnChanges() {
    // console.log(this.product_id);  
    this.getServerData(this.product_id);
    this.createForm();
  }


  public getServerData(product_id) {
    this.loadingProvider.present();
    this.productProvider.getReviews(product_id).subscribe(
      response => {
        // console.log(response);
        this.reviews = response.reviews;
        this.pagination = response.pagination;
        this.results = response.results;
      },
      err => console.error(err),
      () => {
        this.loadingProvider.dismiss();
      }
    );
    return event;
  }

  public createForm() {
    this.reviewForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.maxLength(32), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      text: ['', Validators.required],
      rating: ['', Validators.required]
    });

  }

  public onRateChange(rate){
    this.rateValue = rate;    
  }

  public save() {
    this.submitAttempt = true;
    this.formData = this.reviewForm.valid;

    if (this.reviewForm.valid) {
      this.loadingProvider.present();
      this.productProvider.postReviews(this.product_id, this.reviewForm.value).subscribe(
        response => {
          this.responseData = response;

          this.submitAttempt = true;

          if (this.responseData.success && this.responseData.success != '') {
            this.success = this.responseData.success;
            this.alertProvider.title = 'Success';
            this.alertProvider.message = this.success;
            this.alertProvider.showAlert();
            this.reviewForm.reset();
            this.submitAttempt = false;
          }

          if (this.responseData.error && this.responseData.error != '') {
            this.error = this.responseData.error;

            this.alertProvider.title = 'Warning';
            this.alertProvider.message = this.error;
            this.alertProvider.showAlert();
          }


          if (this.responseData.error_name != '') {
            this.reviewForm.controls['name'].setErrors({ 'incorrect': true });
            this.error_name = this.responseData.error_name;            
          }

          if (this.responseData.error_text != '') {
            this.reviewForm.controls['text'].setErrors({ 'incorrect': true });
            this.error_text = this.responseData.error_text;            
          }

          if (this.responseData.error_rating != '') {
            this.reviewForm.controls['rating'].setErrors({ 'incorrect': true });
            this.error_rating = this.responseData.error_rating;            
          }

        },
        err => console.error(err),
        () => {
          this.loadingProvider.dismiss();
        }
      );
    }

  }

}
