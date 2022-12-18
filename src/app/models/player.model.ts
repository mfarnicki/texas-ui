export interface Player {
  playerId: string;
  playerName: string;
  playerStatus: PlayerStatus;
}

export enum PlayerStatus {
  Idle = 0,
  Waiting = 1,
  Winner = 2,
}
