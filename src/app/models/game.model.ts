import { Player } from './player.model';

export interface Game {
  id: string;
  player1?: Player;
  player2?: Player;
  status: GameStatus;
}

export enum GameStatus {
  Idle = 0,
  Active = 1,
  Done = 2,
}
