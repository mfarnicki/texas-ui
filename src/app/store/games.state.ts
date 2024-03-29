import { ActionReducerMap } from '@ngrx/store';
import { Game } from '../models/game.model';
import { PlayerHole } from '../models/player-hole.model';
import { GamesAction } from './games.action';
import { gamesReducer } from './games.reducer';

export interface AppState {
  gameState: GameState;
}

export interface GameState {
  currentGame?: Game;
  currentPlayerId?: string;
  playerHoles: PlayerHole[];
  error?: string;
}

export const reducerMap: ActionReducerMap<AppState, GamesAction> = {
  gameState: gamesReducer,
};
