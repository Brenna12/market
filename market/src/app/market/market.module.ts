import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { SearchBarComponent } from './search-bar/search-bar.component';
import { FiltersComponent } from './filters/filters.component';
import { ShowcaseComponent } from './showcase/showcase.component';
import { CartComponent } from './cart/cart.component';
import { ProductComponent } from './product/product.component';
import { ProductThumbnailComponent } from './product-thumbnail/product-thumbnail.component';
import { CartPreviewComponent } from './cart-preview/cart-preview.component';
import { DataShellComponent } from './data-shell/data-shell.component';
import { SortFiltersComponent } from './sort-filters/sort-filters.component';

import { DataService } from './data.service';
import { CartService } from './cart.service';
import { UrlFormComponent } from './url-form/url-form.component';
import { MarketComponent } from './market.component';


@NgModule({
  declarations: [
    SearchBarComponent,
    FiltersComponent,
    ShowcaseComponent,
    CartComponent,
    ProductComponent,
    ProductThumbnailComponent,
    CartPreviewComponent,
    DataShellComponent,
    SortFiltersComponent,
    UrlFormComponent,
    MarketComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    JsonpModule
  ],
  providers: [
    DataService,
    CartService
  ],
  exports: [
    MarketComponent
  ],
  bootstrap: []
})
export class MarketModule { }
