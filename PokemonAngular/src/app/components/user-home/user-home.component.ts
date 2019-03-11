import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/service/user.service";
import { RedeemUser } from "src/app/models/redeem-user";
import { CurrentSessionService } from "src/app/service/current-session.service";
import { LoggedNavBarComponent } from "../logged-nav-bar/logged-nav-bar.component";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "app-user-home",
  templateUrl: "./user-home.component.html",
  styleUrls: ["./user-home.component.css"]
})
export class UserHomeComponent implements OnInit {
  userModel = new RedeemUser("");
  pokemonArr: any[] = new Array();

  pokemonName: string = "";
  pokemonType: string = "";
  pokemonURL: string = "";
  cardShow: boolean = false;

  //Properties
  username: string = "";
  credit: number = 0;
  score: number = 0;
  hp: number = 0;
  attack: number = 0;
  defense: number = 0;
  constructor(
    private _router: Router,
    private _userService: UserService,
    private _currentSession: CurrentSessionService,
    private loggedNavBar: LoggedNavBarComponent,
    private _http: HttpClient
  ) {}

  ngOnInit() {
    let authToken = JSON.parse(localStorage.getItem("authToken"));
    if (authToken == null) {
      this._router.navigate(["/landing"]);
    }


    //Setup shop local storage
    this._userService.getAllPokemon().subscribe(data => {
      localStorage.setItem("shop", JSON.stringify(data));
    });
    //Setup User Duplicates
    var currentUser = JSON.parse(localStorage.getItem("currentUser"));

    this.userModel.userId = currentUser.userId;
    this._userService.getUserDuplicates(this.userModel).subscribe(data => {
      localStorage.setItem("userDuplicates", JSON.stringify(data));
    });

    //LOGGED NAV BAR STUFF

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

  onClickMe() {
    //add d-none class to id of generate-pokemon-pokeball
    //Remove d-none from id of pokemon-card-name
    if (this.cardShow) {
      $("#generate-pokemon-pokeball").removeClass("d-none");
      $("#generate-pokemon-card").addClass("d-none");
      $("#generate-pokemon-draw-btn").addClass("d-none");
    }
    //Create a local varaible to store first part of the pokeAPI URL.
    var tempUrl = "https://pokeapi.co/api/v2/pokemon/";

    //Make a call userService method to make call for random pokemon.

    this._userService.generatePokemon().subscribe(data => {
      //Update the local storage user
      localStorage.setItem("currentUser", JSON.stringify(data.owner));
      //Get the returned user form generatecall
      let returnedUser = data.owner;
      //Get the returned pokemon from the genreate call
      let newPokemon = data.ownedPokemon[0];
      //Check if the pokemon is a duplicate (if count is 1 then not a duplicate.)
      if (newPokemon.count == 1) {
        //New pokemon discovered update score
        let newScore = returnedUser.score;
        //Attempt to set the score in the logged nav from the setter method.
        this.score = newScore;
        //this.loggedNavBar.setScore(newScore);

        // this._router
        //   .navigateByUrl("/shop", { skipLocationChange: true })
        //   .then(() => this._router.navigate(["/userhome"]));
      } else {
        //IF the count wasn't 1 then it was a duplicate pokemon. Do NOT update score.
      }
      //Variables for URL of sprite and poketype.
      var spriteURL = "";
      var pokeTYPE = "";
      var pokemonName = "";

      //Make a call to POKEAPI

      this._http.get<any>(tempUrl + newPokemon.pokemonId).subscribe(data => {
        //Data = Full pokemon reponse form the POKEAPI
        spriteURL = data.sprites.front_default;
        pokeTYPE = data.types[0].type.name;
        pokemonName = data.name;

        //Speed
        var speed = data.stats[0].base_stat;

        //HP
        var hp = data.stats[5].base_stat;

        //Defense
        var defense = data.stats[3].base_stat;

        //Attack
        var attack = data.stats[4].base_stat;

        //Set the porperty values of the class
        this.hp = hp;
        this.attack = attack;
        this.defense = defense;
        this.pokemonName = this.capitalize(pokemonName);
        this.pokemonType = this.capitalize(pokeTYPE);
        this.pokemonURL = spriteURL;
      });

      //Update collection in localstorage.

      //New call to database for new collection after new pokemon was added.
      this._userService.getUserCollection().subscribe(data => {
        //Set the local storage currentColletion to the updated collection after new pokemon was added.
        localStorage.setItem(
          "currentCollection",
          JSON.stringify(data.ownedPokemon)
        );
      });
    });
  }

  capitalize(word: string) {
    var newName = word.charAt(0).toUpperCase();
    var substring = word.substring(1);
    var uppercaseName = newName + substring;

    return uppercaseName;
  }

  onBallClick() {
    //Hide pokeball img and show card div
    $("#generate-pokemon-pokeball").addClass("d-none");
    $("#generate-pokemon-card").removeClass("d-none");
    $("#generate-pokemon-draw-btn").removeClass("d-none");
    this.cardShow = true;
  }

  //Method call for onLogout click event.
  onLogout() {
    //Clears local storage of user object.
    localStorage.clear();
    //Route back to landing page.
    this._router.navigate(["/landing"]);
  }
}
