import { Card } from './card.model';
import { Player } from './player.model';

export interface Game {
  id: string;
  players: Player[];
  status: GameStatus;
  deck: Card[];
}

export enum GameStatus {
  Idle = 0,
  Active = 1,
  Done = 2,
}
