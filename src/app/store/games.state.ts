import { ActionReducerMap } from '@ngrx/store';
import { Game } from '../models/game.model';
import { gamesReducer } from './games.reducer';

export interface AppState {
  gameState: GameState;
}

export interface GameState {
  currentGame?: Game;
  error?: string;
}

export const appReducerMap: ActionReducerMap<AppState, any> = {
  gameState: gamesReducer,
};
