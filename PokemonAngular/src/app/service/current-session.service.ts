import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class CurrentSessionService {
  userId: number;
  userScore: number;
  userCredits: number;
  userName: string;
  constructor() {}

  getUserId() {
    return this.userId;
  }

  getUserScore() {
    return this.userScore;
  }

  getUserCredits() {
    return this.userCredits;
  }

  getUserName() {
    return this.userName;
  }

  setUserId(userId: number) {
    this.userId = userId;
  }

  setUserScore(userScore: number) {
    this.userScore = userScore;
  }

  setUserCredits(userCredits: number) {
    this.userCredits = userCredits;
  }

  setUserName(userName: string) {
    console.log("userName in services ", userName);
    this.userName = userName;
  }
}
