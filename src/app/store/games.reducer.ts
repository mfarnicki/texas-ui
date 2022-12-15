import {
  GamesAction,
  RESET_GAME,
  SET_ERROR,
  UPDATE_GAME,
} from './games.action';
import { GameState } from './games.state';

const defaultState: GameState = {
  currentGame: undefined,
  error: undefined,
};

export function gamesReducer(
  state: GameState = defaultState,
  action: GamesAction
): GameState {
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
        error: undefined,
      };

    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
}
