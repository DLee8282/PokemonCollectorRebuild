import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/service/user.service";
import { HttpClient } from "@angular/common/http";
import { PokemonObject } from "src/app/models/pokemon-object";
import { BuyTicket } from "src/app/models/buy-ticket";
import { Router } from "@angular/router";
@Component({
  selector: "app-shop-page",
  templateUrl: "./shop-page.component.html",
  styleUrls: ["./shop-page.component.css"]
})
export class ShopPageComponent implements OnInit {
  pokemonModel = new PokemonObject("");
  buyTicketModel = new BuyTicket("", "");
  pokemonName: string = "";
  pokemonType: string = "";
  pokemonURL: string = "";
  hp: number = 0;
  attack: number = 0;
  defense: number = 0;
  alertShowing = false;
  pokeID: string = "";
  pokemonArr: any[] = new Array();

  cardShow: boolean = false;
  //Properties
  username: string = "";
  credit: number = 0;
  score: number = 0;
  constructor(
    private _http: HttpClient,
    private _userService: UserService,
    private _router: Router
  ) {}

  ngOnInit() {
    let authToken = JSON.parse(localStorage.getItem("authToken"));
    if (authToken == null) {
      this._router.navigate(["/landing"]);
    } else {
    }
    ////////////////SHOP MENU

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
          pokemonType = this.capitalize(data.types[0].type.name);
          var tempName = this.capitalize(shopCollection[i].pokemonName);

          //Set up stats
          //Speed
          var speed = data.stats[0].base_stat;
          shopCollection[i].speed = speed;
          //HP
          var hp = data.stats[5].base_stat;
          shopCollection[i].hp = hp;
          //Defense
          var defense = data.stats[3].base_stat;
          shopCollection[i].defense = defense;
          //Attack
          var attack = data.stats[4].base_stat;
          shopCollection[i].attack = attack;

          shopCollection[i].URL = spriteURL;
          shopCollection[i].pokemonType = pokemonType;
          shopCollection[i].pokemonName = tempName;

          this.pokemonArr.push(shopCollection[i]);
        });
    }

    ///////END SHOP MENU

    let tempScore = JSON.parse(sessionStorage.getItem("score"));
    //Get Active User from local storage.
    var currentUser = JSON.parse(localStorage.getItem("currentUser"));

    //Set local variables for currentUser.
    var userName = currentUser.username;
    var credit = currentUser.credit;
    //var score = currentUser.score;
    var currentScore = JSON.parse(localStorage.getItem("currentScore"));
    var score = currentUser.score;

    //Bind active user info to properties.
    //Bind username
    this.username = userName;
    //Bind Credit Amount
    this.credit = credit;
    this.score = score;
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

        //HP
        var hp = data.stats[5].base_stat;

        //Defense
        var defense = data.stats[3].base_stat;

        //Attack
        var attack = data.stats[4].base_stat;
        this.hp = hp;
        this.attack = attack;
        this.defense = defense;
        this.pokemonName = this.capitalize(data.name);
        this.pokemonType = this.capitalize(data.types[0].type.name);
        this.pokemonURL = data.sprites.front_default;
      });

    this._userService.buyPokemon(this.buyTicketModel).subscribe(data => {
      if (data == null) {
        if (this.alertShowing == false) {
          $("#no-credit-alert").removeClass("d-none");
          this.alertShowing = true;
        }
      } else {
        this.credit = data.owner.credit;
        this.score = data.owner.score;
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

  capitalize(word: string) {
    var newName = word.charAt(0).toUpperCase();
    var substring = word.substring(1);
    var uppercaseName = newName + substring;

    return uppercaseName;
  }

  //Method call for onLogout click event.
  onLogout() {
    //Clears local storage of user object.
    localStorage.clear();
    //Route back to landing page.
    this._router.navigate(["/landing"]);
  }

  onAlertClose() {
    if (this.alertShowing) {
      $("#no-credit-alert").addClass("d-none");
      this.alertShowing = false;
    }
  }
}
