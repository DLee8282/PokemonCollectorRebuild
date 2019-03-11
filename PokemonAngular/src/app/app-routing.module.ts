import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LandingPageComponent } from "./components/landing-page/landing-page.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { UserHomeComponent } from "./components/user-home/user-home.component";
import { CollectionPageComponent } from "./components/collection-page/collection-page.component";
import { RedeemPageComponent } from "./components/redeem-page/redeem-page.component";
import { ShopPageComponent } from "./components/shop-page/shop-page.component";
import { BuyConfirmComponent } from "./components/buy-confirm/buy-confirm.component";
import { LoggedNavBarComponent } from "./components/logged-nav-bar/logged-nav-bar.component";

const routes: Routes = [
  {
    path: "redeem",
    component: RedeemPageComponent
  },
  {
    path: "loggedNav",
    component: LoggedNavBarComponent
  },

  {
    path: "confirmPurchase",
    component: BuyConfirmComponent
  },

  {
    path: "shop",
    component: ShopPageComponent
  },
  {
    path: "collection",
    component: CollectionPageComponent
  },
  {
    path: "landing",
    component: LandingPageComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "userhome",
    component: UserHomeComponent
  },

  { path: "", redirectTo: "/landing", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
