export interface Player {
  id: string;
  name: string;
  status: PlayerStatus;
  chips: number;
}

export enum PlayerStatus {
  Idle = 0,
  Waiting = 1,
  WaitingFor = 2,
  Folded = 3,
  Winner = 4,
}
