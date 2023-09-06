import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { HeaderComponent } from './components/header/header.component';
import { ToastrModule } from 'ngx-toastr';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FoodComponent } from './components/food/food.component';
import { FilterFoodComponent } from './components/filter-food/filter-food.component';
import { CartComponent } from './components/cart/cart.component';
import { AppRoutingModule } from './app-routing.module';
import { SearchFoodComponent } from './components/search-food/search-food.component';
import { HttpClientModule } from '@angular/common/http';
import { CurrencyPipe } from '@angular/common';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { SignupComponent } from './components/signup/signup.component';
import { ViewdetailsComponent } from './components/viewdetails/viewdetails.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { NgxPaginationModule } from 'ngx-pagination';
import { AboutComponent } from './components/about/about.component';
import { ContactFormComponent } from './components/contact/contact.component';
import { FoodlistComponent } from './components/foodlist/foodlist.component';
import { AddfoodComponent } from './components/addfood/addfood.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserComponent } from './components/user/user.component';
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
    AdminComponent,
    UserComponent,



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