import { Component, OnInit } from "@angular/core";
import { RegisterUser } from "src/app/models/register-user";
import { UserService } from "src/app/service/user.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  //isSuper is 0 => false
  userModel = new RegisterUser("", "", "", "", "", 0);
  alertShowing = false;
  constructor(private _router: Router, private _userService: UserService) {}

  ngOnInit() {}

  onSubmit() {
    this._userService.createUser(this.userModel).subscribe(data => {
      if (data === "false") {
        if (this.alertShowing == false) {
          $("#login-alert").removeClass("d-none");
          this.alertShowing = true;
        }
        //this._router.navigate(["/landing"]);
      } else {
        this._router.navigate(["/login"]);
      }
    });
  }

  onAlertClose() {
    if (this.alertShowing) {
      $("#login-alert").addClass("d-none");
      this.alertShowing = false;
    }
  }
}
