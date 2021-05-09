import { GameResultTypes, GameState, GameStatusTypes, GameTurnTypes } from '../contracts';

export enum ActionTypes {
  CHANGE_GAME_STATUS = 'CHANGE_GAME_STATUS',
  CHANGE_GAME_RESULT = 'CHANGE_GAME_RESULT',
  CHANGE_GAME_TURN = 'CHANGE_GAME_TURN',
  APPLY_SETTINGS = 'APPLY_SETTINGS',
  APPLY_MATCHES_CHOSE = 'APPLY_MATCHES_CHOSE',
  BOT_CHOSE = 'BOT_CHOSE',
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

export const applyMatchesChose = (payload: number) => {
  return {
    type: ActionTypes.APPLY_MATCHES_CHOSE,
    payload: payload,
  };
};

export const botMatchesChose = (payload: number) => {
  return {
    type: ActionTypes.BOT_CHOSE,
    payload: payload,
  };
};

export interface GameActionsInterface {
  type: ActionTypes;
  payload?: any;
}

export type GameActions = GameActionsInterface;
