import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { CartComponent } from './cart/cart.component';
import { HeaderComponent } from './header/header.component';
import { FoodComponent } from './food/food.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';


const routes: Routes = [
  { path: 'cart', component: CartComponent},
  { path: 'home', component: FoodComponent },
  { path: 'checkout', component: CheckoutComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];


@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
