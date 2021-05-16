import {
  GameResultTypes,
  GameState,
  GameStatusTypes,
  GameTurnTypes,
  PlayersTypes,
} from '../contracts';

export enum ActionTypes {
  CHANGE_GAME_STATUS = 'CHANGE_GAME_STATUS',
  CHANGE_GAME_RESULT = 'CHANGE_GAME_RESULT',
  CHANGE_GAME_TURN = 'CHANGE_GAME_TURN',
  APPLY_SETTINGS = 'APPLY_SETTINGS',
  APPLY_MATCHES_CHOSE = 'APPLY_MATCHES_CHOSE',
  RESTART_GAME = 'RESTART_GAME',
}

export const changeGameStatus = (payload: GameStatusTypes) => {
  return {
    type: ActionTypes.CHANGE_GAME_STATUS,
    payload: payload,
  };
};

export const changeGameResult = (payload: GameResultTypes) => {
  return {
    type: ActionTypes.CHANGE_GAME_RESULT,
    payload: payload,
  };
};

export const changeGameTurn = (payload: GameTurnTypes) => {
  return {
    type: ActionTypes.CHANGE_GAME_TURN,
    payload: payload,
  };
};

export const restartGame = () => {
  return {
    type: ActionTypes.RESTART_GAME,
  };
};

export const settingsApply = (payload: GameState['settings']) => {
  return {
    type: ActionTypes.APPLY_SETTINGS,
    payload: payload,
  };
};

export const applyMatchesChose = (num: number, player: PlayersTypes) => {
  return {
    type: ActionTypes.APPLY_MATCHES_CHOSE,
    payload: { num, player },
  };
};

export interface GameActionsInterface {
  type: ActionTypes;
  payload?: any;
}

export type GameActions = GameActionsInterface;
