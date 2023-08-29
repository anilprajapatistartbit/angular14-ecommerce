import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { CartComponent } from './cart/cart.component';
import { HeaderComponent } from './header/header.component';
import { FoodComponent } from './food/food.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ViewdetailsComponent } from './viewdetails/viewdetails.component';
import { authGuard } from './auth.guard';
import { ContactFormComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { FoodlistComponent } from './foodlist/foodlist.component';





const routes: Routes = [
  { path: 'cart', component: CartComponent,canActivate: [authGuard] },
  { path: 'home', component: FoodComponent,canActivate: [authGuard] },
  { path: 'checkout', component: CheckoutComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'about', component: AboutComponent},
  { path: 'contact', component: ContactFormComponent},
  { path: 'foodlist', component: FoodlistComponent},
  { path: 'viewdetail/:id', component: ViewdetailsComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];


@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
