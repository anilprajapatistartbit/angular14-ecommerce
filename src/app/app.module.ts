import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';
import { ToastrModule } from 'ngx-toastr';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FoodComponent } from './food/food.component';
import { FilterFoodComponent } from './filter-food/filter-food.component';
import { CartComponent } from './cart/cart.component';
import { AppRoutingModule } from './app-routing.module';
import { SearchFoodComponent } from './search-food/search-food.component';
import { HttpClientModule } from '@angular/common/http';
import { CurrencyPipe } from '@angular/common';
import { CheckoutComponent } from './checkout/checkout.component';
import { LoginComponent } from './login/login.component';
import { PaymentComponent } from './payment/payment.component';
import { SignupComponent } from './signup/signup.component';
import { ViewdetailsComponent } from './viewdetails/viewdetails.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { NgxPaginationModule } from 'ngx-pagination';
import { AboutComponent } from './about/about.component';
import { ContactFormComponent } from './contact/contact.component';
import { FoodlistComponent } from './foodlist/foodlist.component';
import { AddfoodComponent } from './addfood/addfood.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FoodComponent,
    FilterFoodComponent,
    CartComponent,
    SearchFoodComponent,
    CheckoutComponent,
    LoginComponent,
    PaymentComponent,
    SignupComponent,
    ViewdetailsComponent,
    AboutComponent,
    ContactFormComponent,
    FoodlistComponent,
    AddfoodComponent,



  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxImageZoomModule ,
    ToastrModule.forRoot()
  ],
  providers: [CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
