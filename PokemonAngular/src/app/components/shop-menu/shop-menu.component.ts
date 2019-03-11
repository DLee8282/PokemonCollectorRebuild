import { Component, OnInit, Input } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserService } from "src/app/service/user.service";
import { PokemonObject } from "src/app/models/pokemon-object";
import { BuyTicket } from "src/app/models/buy-ticket";
import { Router } from "@angular/router";
@Component({
  selector: "app-shop-menu",
  templateUrl: "./shop-menu.component.html",
  styleUrls: ["./shop-menu.component.css"]
})
export class ShopMenuComponent implements OnInit {
  pokemonModel = new PokemonObject("");
  buyTicketModel = new BuyTicket("", "");
  pokemonName: string = "";
  pokemonType: string = "";
  pokemonURL: string = "";

  pokeID: string = "";
  pokemonArr: any[] = new Array();

  cardShow: boolean = false;
  constructor(
    private _http: HttpClient,
    private _userService: UserService,
    private _router: Router
  ) {}

  ngOnInit() {
    //Front of URl for poke API
    var tempUrl = "https://pokeapi.co/api/v2/pokemon/";
    // Store the localStorage shop object into a  local variable.
    var shopCollection = JSON.parse(localStorage.getItem("shop"));
    //Variables to hold spiriteURL and pokemonType.
    var spriteURL = "";
    var pokemonType = "";
    //Loop through the entire shop collection and create a shop item for each pokemon.
    for (let i = 0; i < shopCollection.length; i++) {
      //Call PokeAPI for every item in collection.
      this._http
        .get<any>(tempUrl + shopCollection[i].pokemonId + "/")
        .subscribe(data => {
          //Set url from pokiAPI for sprite image.
          spriteURL = data.sprites.front_default;
          //Set the pokemon Type
          pokemonType = data.types[0].type.name;

          shopCollection[i].URL = spriteURL;
          shopCollection[i].pokemonType = pokemonType;

          this.pokemonArr.push(shopCollection[i]);
        });
    }
  }

  onBuySubmit() {
    //add d-none class to id of generate-pokemon-pokeball
    //Remove d-none from id of pokemon-card-name
    if (this.cardShow) {
      $("#generate-pokemon-pokeball").removeClass("d-none");
      $("#generate-pokemon-card").addClass("d-none");
      $("#generate-pokemon-draw-btn").addClass("d-none");
    }
    //Get User Id
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));

    //Get Pokemon ID
    this.buyTicketModel.POKEID = this.pokemonModel.pokemonId;
    this.buyTicketModel.USERID = currentUser.userId;
    //Call to Userservice method buyPokemon
    //Pass in buyTicketModel

    //Make a call to PokiAPI for the pokemon being bought.
    var pokiUrl = "https://pokeapi.co/api/v2/pokemon/";
    this._http
      .get<any>(pokiUrl + this.buyTicketModel.POKEID + "/")
      .subscribe(data => {
        this.pokemonName = data.name;
        this.pokemonType = data.types[0].type.name;
        this.pokemonURL = data.sprites.front_default;
      });

    this._userService.buyPokemon(this.buyTicketModel).subscribe(data => {
      if (data == null) {
      } else {
        //Update Local Storage User
        localStorage.setItem("currentUser", JSON.stringify(data.owner));
        //Update Local Storage Collection
        localStorage.setItem(
          "currentCollection",
          JSON.stringify(data.ownedPokemon)
        );
      }
    });
  }

  onBallClick() {
    //Hide pokeball img and show card div
    $("#generate-pokemon-pokeball").addClass("d-none");
    $("#generate-pokemon-card").removeClass("d-none");
    $("#generate-pokemon-draw-btn").removeClass("d-none");
    this.cardShow = true;
  }
}
