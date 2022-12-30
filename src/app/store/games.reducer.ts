import {
  GamesAction,
  RESET_GAME,
  SET_ERROR,
  SET_PLAYER,
  UPDATE_GAME,
  UPDATE_PLAYER,
} from './games.action';
import { GameState } from './games.state';

const defaultState: GameState = {
  currentGame: undefined,
  playerHoles: [],
  error: undefined,
};

export function gamesReducer(
  state: GameState = defaultState,
  action: GamesAction
): GameState {
  console.log(action);

  switch (action.type) {
    case UPDATE_GAME:
      return {
        ...state,
        currentGame: action.payload,
        error: undefined,
      };

    case RESET_GAME:
      return {
        ...state,
        currentGame: undefined,
        currentPlayerId: undefined,
        playerHoles: [],
        error: undefined,
      };

    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_PLAYER:
      return {
        ...state,
        playerHoles: action.payload,
        error: undefined,
      };

    case SET_PLAYER:
      return {
        ...state,
        currentPlayerId: action.payload || undefined,
        error: undefined,
      };

    default:
      return state;
  }
}
