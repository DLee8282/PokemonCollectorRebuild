import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/service/user.service";
import { HttpClient } from "@angular/common/http";
@Component({
  selector: "app-collection-preview",
  templateUrl: "./collection-preview.component.html",
  styleUrls: ["./collection-preview.component.css"]
})
export class CollectionPreviewComponent implements OnInit {
  pokemonArr: any[] = new Array();
  alertShowing = false;

  constructor(private _userService: UserService, private _http: HttpClient) {}

  ngOnInit() {
    var pokeID;
    var tempUrl = "https://pokeapi.co/api/v2/pokemon/";

    this._userService.getUserCollection().subscribe(data => {
      localStorage.setItem(
        "currentCollection",
        JSON.stringify(data.ownedPokemon)
      );

      var currentCollection = JSON.parse(
        localStorage.getItem("currentCollection")
      );
      //Check for an empty collection.
      if (currentCollection.length == 0) {
        $("#no-pokemon-alert").removeClass("d-none");
        this.alertShowing = true;
      } else {
        let maxLength = currentCollection.length;
        //Generate Three random numbers.
        var randomThree = new Array();
        for (let i = 0; i < 3; i++) {
          randomThree.push(currentCollection[this.randomNumber(maxLength)]);
        }

        //Grab three random entries from current collection
        for (let i = 0; i < randomThree.length; i++) {
          //Add properties for URL and PokemonType to the collection.
          var spriteURL = "";
          var pokeTYPE = "";
          //Call the PokeAPI for pokemon Info
          this._http
            .get<any>(tempUrl + randomThree[i].pokemonId + "/")
            .subscribe(data => {
              //Store URL of image in local varaible
              spriteURL = data.sprites.front_default;
              //Store type of pokemon in local variable.
              pokeTYPE = this.capitalize(data.types[0].type.name);
              //Add a property to the collection object for URL
              randomThree[i].URL = spriteURL;
              //ADD a property to the collection object for the Type.
              randomThree[i].pokemonType = pokeTYPE;
              //Set up stats
              //Speed
              var speed = data.stats[0].base_stat;
              randomThree[i].speed = speed;
              //HP
              var hp = data.stats[5].base_stat;
              randomThree[i].hp = hp;
              //Defense
              var defense = data.stats[3].base_stat;
              randomThree[i].defense = defense;
              //Attack
              var attack = data.stats[4].base_stat;
              randomThree[i].attack = attack;
              //Push new collection object to pokemonArr proeprty.

              var tempStr = this.capitalize(randomThree[i].pokemonName);
              randomThree[i].pokemonName = tempStr;
              this.pokemonArr.push(randomThree[i]);
            });
        }
      }
    });
  }

  capitalize(word: string) {
    var newName = word.charAt(0).toUpperCase();
    var substring = word.substring(1);
    var uppercaseName = newName + substring;

    return uppercaseName;
  }

  randomNumber(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  onAlertClose() {
    if (this.alertShowing) {
      $("#no-pokemon-alert").addClass("d-none");
      this.alertShowing = false;
    }
  }
}
