import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
@Component({
  selector: "app-full-collection-view",
  templateUrl: "./full-collection-view.component.html",
  styleUrls: ["./full-collection-view.component.css"]
})
export class FullCollectionViewComponent implements OnInit {
  something = "asdadadadad";
  pokemonName: string;
  pokemonURL: string;
  pokemonArr: any[] = new Array();

  constructor(private _http: HttpClient, private _router: Router) {}

  ngOnInit() {
    let authToken = JSON.parse(localStorage.getItem("authToken"));
    if (authToken == null) {
      this._router.navigate(["/landing"]);
    } else {
    }
    //Create a local varaible to store first part of the pokeAPI URL.
    var tempUrl = "https://pokeapi.co/api/v2/pokemon/";
    // Store the localStorage object into a  local variable.

    let tempCollection = JSON.parse(localStorage.getItem("currentCollection"));

    var collection = tempCollection.ownedPokemon;
    // //Loop through the collection object and push to the pokemonArray.
    for (let i = 0; i < tempCollection.length; i++) {
      //Add properties for URL and PokemonType to the collection.
      var spriteURL = "";
      var pokeTYPE = "";
      //Call the PokeAPI for pokemon Info
      this._http
        .get<any>(tempUrl + tempCollection[i].pokemonId + "/")
        .subscribe(data => {
          //Store URL of image in local varaible
          spriteURL = data.sprites.front_default;
          //Store type of pokemon in local variable.
          pokeTYPE = this.capitalize(data.types[0].type.name);

          //Add a property to the collection object for URL
          tempCollection[i].URL = spriteURL;
          //ADD a property to the collection object for the Type.
          tempCollection[i].pokemonType = pokeTYPE;
          var tempName = tempCollection[i].pokemonName;

          var uppercaseName = this.capitalize(tempName);
          tempCollection[i].pokemonName = uppercaseName;
          //Set up stats
          //Speed
          var speed = data.stats[0].base_stat;
          tempCollection[i].speed = speed;
          //HP
          var hp = data.stats[5].base_stat;
          tempCollection[i].hp = hp;
          //Defense
          var defense = data.stats[3].base_stat;
          tempCollection[i].defense = defense;
          //Attack
          var attack = data.stats[4].base_stat;
          tempCollection[i].attack = attack;
          //Push new collection object to pokemonArr proeprty.
          this.pokemonArr.push(tempCollection[i]);
        });
    }
  }

  capitalize(word: string) {
    var newName = word.charAt(0).toUpperCase();
    var substring = word.substring(1);
    var uppercaseName = newName + substring;

    return uppercaseName;
  }
}
