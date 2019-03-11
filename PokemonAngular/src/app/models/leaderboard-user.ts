export class LeaderboardUser {
  constructor(
    public userId: number,
    public username: string,
    public email: string,
    public firstName: string,
    public lastName: string,
    public credit: number,
    public score: number
  ) {}
}
