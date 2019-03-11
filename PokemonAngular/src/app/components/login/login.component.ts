import { Component, OnInit } from "@angular/core";
import { User } from "src/app/user";
import { UserService } from "src/app/service/user.service";
import { Router } from "@angular/router";
import { CurrentSessionService } from "src/app/service/current-session.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  userModel = new User("", "");
  alertShowing = false;

  constructor(
    private _router: Router,
    private _userService: UserService,
    private _currentSession: CurrentSessionService
  ) {}

  ngOnInit() {
  }

  //onSubmit Method for submission of the login form.
  onSubmit() {
    this._userService.login(this.userModel).subscribe(
      data => {

        if (data == null) {
          if (this.alertShowing == false) {
            $("#login-alert").removeClass("d-none");
            this.alertShowing = true;
          }
        } else {

          localStorage.setItem("currentUser", JSON.stringify(data));
          sessionStorage.setItem("score", data.score);
          localStorage.setItem("authToken", JSON.stringify(true));
          //Check Local Storage
          //Route to new userHome
          this._router.navigate(["/userhome"]);
          //return (this.activeUserModel = data);
        }
      },
      error => {
        console.log("Error", error);
      }
    );
  }

  onAlertClose() {
    if (this.alertShowing) {
      $("#login-alert").addClass("d-none");
      this.alertShowing = false;
    }
  }
}
