import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
@Component({
  selector: "app-session-nav-bar",
  templateUrl: "./session-nav-bar.component.html",
  styleUrls: ["./session-nav-bar.component.css"]
})
export class SessionNavBarComponent implements OnInit {
  userName: string;
  score: number;
  credits: number;
  constructor(private _router: Router) {}

  ngOnInit() {
    let tempScore = JSON.parse(sessionStorage.getItem("score"));
    //Get Active User from local storage.
    var currentUser = JSON.parse(localStorage.getItem("currentUser"));

    //Set local variables for currentUser.
    var userName = currentUser.username;
    var credit = currentUser.credit;
    //Bind active user info to properties.
    //Bind username
    this.userName = userName;
    //Bind Credit Amount
    this.credits = credit;
    this.score = tempScore;
  }
  //Method call for onLogout click event.
  onLogout() {
    //Clears local storage of user object.
    localStorage.clear();
    //Route back to landing page.
    this._router.navigate(["/landing"]);
  }
}
