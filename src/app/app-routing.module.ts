import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { CartComponent } from './components/cart/cart.component';
import { HeaderComponent } from './components/header/header.component';
import { FoodComponent } from './components/food/food.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ViewdetailsComponent } from './components/viewdetails/viewdetails.component';
import { authGuard } from './guard/auth.guard';
import { ContactFormComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { FoodlistComponent } from './components/foodlist/foodlist.component';
import { AddfoodComponent } from './components/addfood/addfood.component';
import { AdminComponent } from './components/admin/admin.component';
import { OrderlistingComponent } from './components/orderlisting/orderlisting.component';
import { FoodDetailsComponent } from './components/food-details/food-details.component';





const routes: Routes = [
  { path: 'cart', component: CartComponent },
  { path: 'home', component: FoodComponent},
  { path: 'checkout', component: CheckoutComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'about', component: AboutComponent},
  { path: 'contact', component: ContactFormComponent},
  { path: 'foodlist', component: FoodlistComponent},
  { path: 'orderlist', component: OrderlistingComponent},

  { path: 'fooddetails', component: FoodDetailsComponent},


  { path: 'addfood', component: AddfoodComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'viewdetail/:id', component: ViewdetailsComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];


@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
