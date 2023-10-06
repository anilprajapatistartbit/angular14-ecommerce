import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgToastModule } from 'ng-angular-popup';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TokenInterceptor } from './interceptors/token.interceptor.service';

import { HeaderComponent } from './components/header/header.component';
import { FoodComponent } from './components/food/food.component';
import { FilterFoodComponent } from './components/filter-food/filter-food.component';
import { CartComponent } from './components/cart/cart.component';
import { SearchFoodComponent } from './components/search-food/search-food.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { SignupComponent } from './components/signup/signup.component';
import { ViewdetailsComponent } from './components/viewdetails/viewdetails.component';
import { AboutComponent } from './components/about/about.component';
import { ContactFormComponent } from './components/contact/contact.component';
import { FoodlistComponent } from './components/foodlist/foodlist.component';
import { AddfoodComponent } from './components/addfood/addfood.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserComponent } from './components/user/user.component';
import { OrderlistingComponent } from './components/orderlisting/orderlisting.component';
import { FoodDetailsComponent } from './components/food-details/food-details.component';
import { AddressComponent } from './components/address/address.component';
import { UseraddressComponent } from './components/useraddress/useraddress.component';
import { AddaddressComponent } from './components/addaddress/addaddress.component';
import {NgConfirmModule} from 'ng-confirm-box';
import { OrderbyuserComponent } from './components/orderbyuser/orderbyuser.component';
import { FooddetailsbyuserComponent } from './components/fooddetailsbyuser/fooddetailsbyuser.component';
import { EditproductComponent } from './components/editproduct/editproduct.component';
import { AdminheaderComponent } from './components/adminheader/adminheader.component';
import { FooterComponent } from './components/footer/footer.component';
import { FoodTypeFilterPipe } from './food-filter.pipe';
import { NgArrayPipesModule } from 'ngx-pipes';
import { WishlistComponent } from './components/wishlist/wishlist.component';


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
    OrderlistingComponent,
    FoodDetailsComponent,
    AddressComponent,
    UseraddressComponent,
    AddaddressComponent,
    OrderbyuserComponent,
    FooddetailsbyuserComponent,
    EditproductComponent,
    AdminheaderComponent,
    FooterComponent,
    FoodTypeFilterPipe,
    WishlistComponent
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxImageZoomModule,
    NgToastModule,
    ToastrModule.forRoot(),
    NgConfirmModule,
    NgArrayPipesModule
    
  
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
