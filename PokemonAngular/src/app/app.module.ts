import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";

import { AppRoutingModule } from "./app-routing.module";
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { LandingPageComponent } from "./components/landing-page/landing-page.component";
import { LeaderboardComponent } from "./components/leaderboard/leaderboard.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { ShopPageComponent } from "./components/shop-page/shop-page.component";
import { LoggedNavBarComponent } from "./components/logged-nav-bar/logged-nav-bar.component";
import { DrawButtonComponent } from "./components/draw-button/draw-button.component";
import { CollectionPreviewComponent } from "./components/collection-preview/collection-preview.component";
import { FullCollectionViewComponent } from "./components/full-collection-view/full-collection-view.component";
import { CollectionViewSearchComponent } from "./components/collection-view-search/collection-view-search.component";
import { CollectionViewFilterComponent } from "./components/collection-view-filter/collection-view-filter.component";
import { ShopMenuComponent } from "./components/shop-menu/shop-menu.component";
import { RedeemButtonComponent } from "./components/redeem-button/redeem-button.component";
import { PokemonCardComponent } from "./components/pokemon-card/pokemon-card.component";
import { RedeemMenuComponent } from "./components/redeem-menu/redeem-menu.component";
import { PokemonShopItemComponent } from "./components/pokemon-shop-item/pokemon-shop-item.component";
import { RedeemPageComponent } from "./components/redeem-page/redeem-page.component";
import { CollectionPageComponent } from "./components/collection-page/collection-page.component";
import { PlayerPreviewComponent } from "./components/player-preview/player-preview.component";
import { UserHomeComponent } from "./components/user-home/user-home.component";
import { CollectionItemComponent } from "./components/collection-item/collection-item.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { BuyConfirmComponent } from "./components/buy-confirm/buy-confirm.component";
import { SessionNavBarComponent } from "./components/session-nav-bar/session-nav-bar.component";

import { GoogleChartsModule } from "angular-google-charts";
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { ErrorMessageComponent } from './components/error-message/error-message.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LandingPageComponent,
    LeaderboardComponent,
    LoginComponent,
    RegisterComponent,
    ShopPageComponent,
    LoggedNavBarComponent,
    DrawButtonComponent,
    CollectionPreviewComponent,
    FullCollectionViewComponent,
    CollectionViewSearchComponent,
    CollectionViewFilterComponent,
    ShopMenuComponent,
    RedeemButtonComponent,
    PokemonCardComponent,
    RedeemMenuComponent,
    PokemonShopItemComponent,
    RedeemPageComponent,
    CollectionPageComponent,
    PlayerPreviewComponent,
    UserHomeComponent,
    CollectionItemComponent,
    BuyConfirmComponent,
    SessionNavBarComponent,
    ErrorMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    GoogleChartsModule.forRoot()
  ],
  providers: [LoginComponent, LoggedNavBarComponent, SessionNavBarComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
