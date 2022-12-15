export interface Card {
  suit: Suit;
  value: number;
}

export enum Suit {
  Spade = 0,
  Heart = 1,
  Diamond = 2,
  Club = 3,
}
