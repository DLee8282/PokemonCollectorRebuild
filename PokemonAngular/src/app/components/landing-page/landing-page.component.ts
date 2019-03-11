import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/service/user.service";
import { HttpClient } from "@angular/common/http";
import { LbUser } from "src/app/models/lb-user";
import { preserveWhitespacesDefault } from "@angular/compiler";
import { ScoreModel } from "src/app/models/score-model";
@Component({
  selector: "app-landing-page",
  templateUrl: "./landing-page.component.html",
  styleUrls: ["./landing-page.component.css"]
})
export class LandingPageComponent implements OnInit {
  chartUserModel = new LbUser("");
  scoreModel = new ScoreModel("", 0);
  userScoreArray: any[] = new Array();
  name: string = "aasdad";
  userId: string = "125";
  tempID: string = "";
  pokemonArr: any[] = new Array();
  usersArr: any[] = new Array();
  constructor(private _userService: UserService, private _http: HttpClient) {}

  ngOnInit() {
    var userList = [];
    this._userService.getLeaderboard().subscribe(data => {
      //Ceate Dropdown


      //////////////////////////////////////////////////////////////////////////////////////////
      for (let i = 0; i < data.length; i++) {
        this.usersArr.push(data[i]);
      }
      //this.usersArr = data;

      for (var i = data.length - 1; i >= 0; i--) {
        let userIDStr = data[i].userId.toString();
        this.tempID = userIDStr;
        $("#leaderboardTable")
          .find("tbody")
          .append(
            '<tr class="customRow" id=" ' +
              [userIDStr] +
              '"><td>' +
              data[i].score +
              "</td><td>" +
              data[i].username +
              "</td></tr>"
          );
      }
    });
  }

  onSubmit() {
    this.generatePie();
  }

  generatePie() {
    ////////////////////////////////////////////////////////////////
    google.charts.load("current", { packages: ["corechart"] });

    google.charts.setOnLoadCallback(drawChart);

    let tempID = this.userId;
    this._userService
      .getUserCollectionLeaderBoard(this.chartUserModel.userId)
      .subscribe(data => {
        let tempCollection = data.ownedPokemon;
        var tempUrl = "https://pokeapi.co/api/v2/pokemon/";
        //Get types of each element in collection

        for (let i = 0; i < tempCollection.length; i++) {
          this._http
            .get<any>(tempUrl + tempCollection[i].pokemonId + "/")
            .subscribe(data => {
              let tempType = data.types[0].type.name;
              tempCollection[i].pokemonType = tempType;
              this.pokemonArr.push(tempCollection[i]);
              localStorage.setItem(
                "playerPreview",
                JSON.stringify(tempCollection)
              );
              //Add the type from pokiApi to the tempColelction as a new property.
            });
        }
      });

    function drawChart() {
      //Types
      let fireType: number = 0;
      let waterType: number = 0;
      let fightingType: number = 0;
      let flyingType: number = 0;
      let grassType: number = 0;
      let poisonType: number = 0;
      let electricType: number = 0;
      let groundType: number = 0;
      let psychicType: number = 0;

      let rockType: number = 0;
      let iceType: number = 0;
      let bugType: number = 0;
      let dragonType: number = 0;
      let ghostType: number = 0;
      let darkType: number = 0;
      let steelType: number = 0;
      let fairyType: number = 0;
      let normalType: number = 0;
      let unknownType: number = 0;
      let tempCollection = JSON.parse(localStorage.getItem("playerPreview"));
      //Loop through pokemonArr and check each elements type. Depending on a switch increment the count fo each type.
      for (let i = 0; i < tempCollection.length; i++) {
        switch (tempCollection[i].pokemonType) {
          case "fire":
            fireType++;
            break;
          case "water":
            waterType++;
            break;
          case "fighting":
            fightingType++;
            break;
          case "flying":
            flyingType++;
            break;
          case "grass":
            grassType++;
            break;
          case "poison":
            poisonType++;
            break;
          case "electric":
            electricType++;
            break;
          case "ground":
            groundType++;
            break;
          case "psychic":
            psychicType++;
            break;
          case "rock":
            rockType++;
            break;
          case "ice":
            iceType++;
            break;
          case "bug":
            bugType++;
            break;
          case "dragon":
            dragonType++;
            break;
          case "ghost":
            ghostType++;
            break;
          case "dark":
            darkType++;
            break;
          case "steel":
            steelType++;
            break;

          case "fairy":
            fairyType++;
            break;
          case "normal":
            normalType++;
            break;
          case "unknown":
            unknownType++;
            break;
          default:
            break;
        }
      }

      var data = google.visualization.arrayToDataTable([
        ["Type", "Amount"],
        ["Fire", fireType],
        ["Water", waterType],
        ["Fighting", fightingType],
        ["Flying", flyingType],
        ["Grass", grassType],
        ["Poison", poisonType],
        ["Electric", electricType],
        ["Ground", groundType],
        ["Psychic", psychicType],
        ["Rock", rockType],
        ["Ice", iceType],
        ["Bug", bugType],
        ["Dragon", dragonType],
        ["Ghost", ghostType],
        ["Dark", darkType],
        ["Steel", steelType],
        ["Fairy", fairyType],
        ["Normal", normalType]
      ]);

      //var data = google.visualization.arrayToDataTable(this.userScoreArray);

      var options = {
        title: " Pokemon Types",
        backgroundColor: "transparent",
        width: 800,
        height: 600,

        legend: {
          textStyle: {
            color: "white",
            fontName: "Arial",
            fontSize: 12
          }
        },
        titleTextStyle: {
          color: "white",
          fontSize: 15
        }
      };

      // Instantiate and draw our chart, passing in some options.
      var chart = new google.visualization.PieChart(
        document.getElementById("chart_div")
      );
      chart.draw(data, options);
    }
  }
}
