import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserService } from "src/app/service/user.service";
import { PokemonObject } from "src/app/models/pokemon-object";
import { RedeemUser } from "src/app/models/redeem-user";
import { RedeemTicket } from "src/app/models/redeem-ticket";
import { Router } from "@angular/router";
@Component({
  selector: "app-redeem-page",
  templateUrl: "./redeem-page.component.html",
  styleUrls: ["./redeem-page.component.css"]
})
export class RedeemPageComponent implements OnInit {
  userModel = new RedeemUser("");
  redeemTicketModel = new RedeemTicket("", "");
  pokemonArr: any[] = new Array();
  pokemonModel = new PokemonObject("");
  pokemonName: string = "";
  pokemonType: string = "";
  pokemonURL: string = "";
  hp: number = 0;
  attack: number = 0;
  defense: number = 0;
  pokemonCount: number = 0;
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
    //Setup User Duplicates
    var currentUser = JSON.parse(localStorage.getItem("currentUser"));

    this.userModel.userId = currentUser.userId;
    this._userService.getUserDuplicates(this.userModel).subscribe(data => {
      localStorage.setItem("userDuplicates", JSON.stringify(data));
      //Create URL front for pokeAPI.
      var tempUrl = "https://pokeapi.co/api/v2/pokemon/";
      var spriteURL = "";
      var pokemonType = "";
      var currentDuplicates = data;
      //Loop through current duplicates and generate form elements
      for (let i = 0; i < currentDuplicates.length; i++) {
        //   //Call PokeAPI for every item in collection.
        this._http
          .get<any>(tempUrl + currentDuplicates[i].pokemonId + "/")
          .subscribe(data => {
            spriteURL = data.sprites.front_default;
            var tempName = this.capitalize(currentDuplicates[i].pokemonName);

            pokemonType = this.capitalize(data.types[0].type.name);
            currentDuplicates[i].URL = spriteURL;
            currentDuplicates[i].pokemonType = pokemonType;
            currentDuplicates[i].pokemonName = tempName;
            //Speed
            var speed = data.stats[0].base_stat;
            currentDuplicates[i].speed = speed;
            //HP
            var hp = data.stats[5].base_stat;
            currentDuplicates[i].hp = hp;
            //Defense
            var defense = data.stats[3].base_stat;
            currentDuplicates[i].defense = defense;
            //Attack
            var attack = data.stats[4].base_stat;
            currentDuplicates[i].attack = attack;
            this.pokemonArr.push(currentDuplicates[i]);
          });

        this.pokemonCount = currentDuplicates[i].count - 1;
      }
    });

    //////////////////////////////////////////////////////////////////////////////////////
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

  onRedeemSubmit() {
    //Get User Id
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let userId = currentUser.userId;
    //Get Pokemon ID
    localStorage.setItem("redeemTicket", JSON.stringify(this.pokemonModel));
    var tempUrl = "https://pokeapi.co/api/v2/pokemon/";
    let redeemPokemonID = this.pokemonModel.pokemonId;
    this._http.get<any>(tempUrl + redeemPokemonID + "/").subscribe(data => {
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

    this._userService.redeemPokemonById().subscribe(data => {
      this.credit = data.owner.credit;
      localStorage.setItem("currentUser", JSON.stringify(data.owner));
      localStorage.setItem("userDuplicates", JSON.stringify(data.ownedPokemon));
      location.reload(true);
    });
  }

  capitalize(word: string) {
    var newName = word.charAt(0).toUpperCase();
    var substring = word.substring(1);
    var uppercaseName = newName + substring;

    return uppercaseName;
  }

  onBuyAll() {
    this._userService.redeemAll().subscribe(data => {
      this.credit = data.owner.credit;

      localStorage.setItem("currentUser", JSON.stringify(data.owner));
      location.reload(true);
    });
  }

  //Method call for onLogout click event.
  onLogout() {
    //Clears local storage of user object.
    localStorage.clear();
    //Route back to landing page.
    this._router.navigate(["/landing"]);
  }
}
