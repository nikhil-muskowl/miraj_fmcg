import { NgModule } from '@angular/core';
import { ProductReviewComponent } from './product-review/product-review';
import { HeaderComponent } from './header/header';
import { CartSummaryComponent } from './cart-summary/cart-summary';
import { CartTermsComponent } from './cart-terms/cart-terms';

@NgModule({
    declarations: [
        ProductReviewComponent,
        HeaderComponent,
    CartSummaryComponent,
    CartTermsComponent,
    ],
    imports: [],
    exports: [
        ProductReviewComponent,
        HeaderComponent,
    CartSummaryComponent,
    CartTermsComponent,

    ]
})
export class ComponentsModule { }
