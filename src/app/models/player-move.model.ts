export interface PlayerMove {
  playerId: string;
  move: MoveType;
  amount: number;
}

export enum MoveType {
  Blind = 0,
  Bet = 1,
  Raise = 2,
  Call = 3,
  Fold = 4,
}
