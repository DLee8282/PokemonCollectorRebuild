import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "src/app/user";
import { BuyTicket } from "src/app/models/buy-ticket";
import { RegisterUser } from "../models/register-user";
import { HttpParams } from "@angular/common/http";
import { RedeemUser } from "src/app/models/redeem-user";
@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private _http: HttpClient) {}

  currentUser = JSON.parse(localStorage.getItem("currentUser"));

  //URL endpoint for getting all users to for the leaderboard.
  _leaderUrl = "http://ec2-18-220-58-191.us-east-2.compute.amazonaws.com:8080/PokemonCollector/leader";
  //URL endpoint for registering a new user.
  _createUrl = "http://ec2-18-220-58-191.us-east-2.compute.amazonaws.com:8080/PokemonCollector/create";
  //URL endpoint for generating a new pokemon.
  _generateUrl = "http://ec2-18-220-58-191.us-east-2.compute.amazonaws.com:8080/PokemonCollector/generate";
  //URL endpoint for getting active users collection.

  _userCollectionUrl = "http://ec2-18-220-58-191.us-east-2.compute.amazonaws.com:8080/PokemonCollector/collection";
  //URL endpoint for user login.
  _loginUrl = "http://ec2-18-220-58-191.us-east-2.compute.amazonaws.com:8080/PokemonCollector/login";
  //URL endpoint for shop getALl
  _shopUrl = "http://ec2-18-220-58-191.us-east-2.compute.amazonaws.com:8080/PokemonCollector/shop";
  //URL endpoint for buy pokemon
  _buyUrl = "http://ec2-18-220-58-191.us-east-2.compute.amazonaws.com:8080/PokemonCollector/redeem";
  _getDuplicatesUrl = "http://ec2-18-220-58-191.us-east-2.compute.amazonaws.com:8080/PokemonCollector/collection";
  _redeemUrl = "http://ec2-18-220-58-191.us-east-2.compute.amazonaws.com:8080/PokemonCollector/redeem";

  //Method call for GET request for leaderboard users.
  getLeaderboard() {
    return this._http.get<any>(this._leaderUrl);
  }
  //Method call fo POST request for registering a new user.
  createUser(newUser: RegisterUser) {
    return this._http.post<any>(this._createUrl, newUser);
  }
  //Method call for GET request for generating a new pokemon.
  generatePokemon() {
    var currentUser = JSON.parse(localStorage.getItem("currentUser"));
    var userID: string;
    userID = currentUser.userId;
    let params = new HttpParams().set("USERID", userID);
    return this._http.get<any>(this._generateUrl, { params });
  }
  //Method call for GET request for retieving the active users collection.
  getUserCollection() {
    // console.log(this.currentUser);
    // console.log(this._userCollectionUrl);
    var currentUser = JSON.parse(localStorage.getItem("currentUser"));
    //console.log("currentUser in userservice", currentUser);
    var userID: string;
    userID = currentUser.userId;
    //console.log("userID in user service", userID);
    let params = new HttpParams().set("USERID", userID);
    return this._http.get<any>(this._userCollectionUrl, { params });
  }

  getUserCollectionLeaderBoard(userID: string) {
    let params = new HttpParams().set("USERID", userID);
    return this._http.get<any>(this._userCollectionUrl, { params });
  }

  //Method for redeeming one specific pokemon
  redeemPokemonById() {
    var currentUser = JSON.parse(localStorage.getItem("currentUser"));
    console.log("currentUSer ", currentUser);
    var userID: string;
    userID = currentUser.userId;
    var redeemTicket = JSON.parse(localStorage.getItem("redeemTicket"));
    console.log(redeemTicket);
    console.log(redeemTicket.pokemonId);
    let params = new HttpParams()
      .set("USERID", userID)
      .set("POKEID", redeemTicket.pokemonId);
    //params = new HttpParams().set("POKEID", redeemTicket.POKEID);
    return this._http.get<any>(this._redeemUrl, { params });
  }

  redeemAll() {
    var currentUser = JSON.parse(localStorage.getItem("currentUser"));
    console.log("currentUSer ", currentUser);
    var userID: string;
    userID = currentUser.userId;
    let params = new HttpParams().set("USERID", userID);
    return this._http.get<any>(this._redeemUrl, { params });
  }

  //Method call for GET request for retrieving user duplicates.
  getUserDuplicates(redeemUser: RedeemUser) {
    return this._http.post<any>(this._getDuplicatesUrl, redeemUser);
  }
  //Method call for POST request for login.
  login(user: User) {
    return this._http.post<any>(this._loginUrl, user);
  }

  //Method call for POST to redeem for pokemon buy.
  buyPokemon(buyTicket: BuyTicket) {
    return this._http.post<any>(this._buyUrl, buyTicket);
  }

  //Method cal for GET to get all pokemon for the shop.
  getAllPokemon() {
    return this._http.get<any>(this._shopUrl);
  }
}
