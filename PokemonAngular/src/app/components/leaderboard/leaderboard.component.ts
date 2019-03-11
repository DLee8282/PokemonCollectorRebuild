import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/service/user.service";

@Component({
  selector: "app-leaderboard",
  templateUrl: "./leaderboard.component.html",
  styleUrls: ["./leaderboard.component.css"]
})
export class LeaderboardComponent implements OnInit {
  constructor(private _userService: UserService) {}

  ngOnInit() {
    this._userService.getLeaderboard().subscribe(data => {
      for (var i = data.length - 1; i >= 0; i--) {
        $("#leaderboardTable")
          .find("tbody")
          .append(
            "<tr><td>" +
              data[i].score +
              "</td><td>" +
              data[i].username +
              "</td></tr>"
          );
      }
    });
  }
}
