import { Action } from '@ngrx/store';
import { Game } from '../models/game.model';

export const UPDATE_GAME = '[Games] Update';
export const RESET_GAME = '[Games] Reset';
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

export type GamesAction = UpdateGame | ResetGame | SetError;
