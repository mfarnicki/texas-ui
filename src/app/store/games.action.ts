import { Action } from '@ngrx/store';
import { Game } from '../models/game.model';
import { PlayerHole } from '../models/player-hole.model';

export const UPDATE_GAME = '[Games] Update';
export const UPDATE_PLAYER = '[Games] Update Player';
export const RESET_GAME = '[Games] Reset';
export const SET_PLAYER = '[Games] Set Player';
export const SET_ERROR = '[Games] Set Error';

export class UpdateGame implements Action {
  readonly type = UPDATE_GAME;
  constructor(public payload: Game) {}
}

export class ResetGame implements Action {
  readonly type = RESET_GAME;
}

export class SetError implements Action {
  readonly type = SET_ERROR;
  constructor(public payload: string) {}
}

export class UpdatePlayer implements Action {
  readonly type = UPDATE_PLAYER;
  constructor(public payload: PlayerHole[]) {}
}

export class SetPlayer implements Action {
  readonly type = SET_PLAYER;
  constructor(public payload: string | null) {}
}

export type GamesAction =
  | UpdateGame
  | UpdatePlayer
  | ResetGame
  | SetError
  | SetPlayer;
