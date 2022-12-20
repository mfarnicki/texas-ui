import { Card } from './card.model';
import { Player } from './player.model';

export interface Game {
  id: string;
  players: Player[];
  status: GameStatus;
  waitingForId: string;
  dealerId: string;
  communityCards: Card[];
}

export enum GameStatus {
  Idle = 0,
  Preflop = 1,
  Flop = 2,
  Turn = 3,
  River = 4,
  Final = 5,
}
