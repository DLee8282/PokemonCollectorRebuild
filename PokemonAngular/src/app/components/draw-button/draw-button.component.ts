import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserService } from "src/app/service/user.service";
import { RedeemUser } from "src/app/models/redeem-user";
import { CurrentSessionService } from "src/app/service/current-session.service";
import { Router } from "@angular/router";

import { LoggedNavBarComponent } from "../logged-nav-bar/logged-nav-bar.component";
@Component({
  selector: "app-draw-button",
  templateUrl: "./draw-button.component.html",
  styleUrls: ["./draw-button.component.css"]
})
export class DrawButtonComponent implements OnInit {
  pokemonArr: any[] = new Array();
  pokemonName: string = "";
  pokemonType: string = "";
  pokemonURL: string = "";
  cardShow: boolean = false;
  userModel = new RedeemUser("");
  constructor(
    private _userService: UserService,
    private _http: HttpClient,
    private _currentSession: CurrentSessionService,
    private loggedNavBar: LoggedNavBarComponent,
    private _router: Router
  ) {}

  ngOnInit() {}

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
        this.loggedNavBar.setScore(newScore);

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
        pokemonName = this.capitalize(data.name);

        //Set the porperty values of the class
        this.pokemonName = pokemonName;
        this.pokemonType = pokeTYPE;
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
}
