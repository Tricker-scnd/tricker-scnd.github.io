import { ActionTypes, GameActions } from './actions';
import { GameResultTypes, GameState, GameStatusTypes, GameTurnTypes } from './contracts';

export const defaultGameState: GameState = {
  gameResult: GameResultTypes.NEVER,
  gameStatus: GameStatusTypes.PREPARE,
  gameTurn: GameTurnTypes.NEVER,
  game: {
    currentMatchesCount: 25,
    player: 0,
    bot: 0,
    playerLog: [],
    botLog: [],
  },
  settings: {
    totalMatches: 25,
    maximumMatchesToChose: 3,
    firstTurn: GameTurnTypes.ME,
  },
};

export default function reducer(state: GameState = defaultGameState, action: GameActions) {
  switch (action.type) {
    case ActionTypes.CHANGE_GAME_STATUS:
      return {
        ...state,
        gameStatus: action.payload,
      };
    case ActionTypes.CHANGE_GAME_RESULT:
      return {
        ...state,
        gameResult: action.payload,
      };

    case ActionTypes.CHANGE_GAME_TURN:
      return {
        ...state,
        gameTurn: action.payload,
      };

    case ActionTypes.APPLY_SETTINGS:
      return {
        ...state,
        settings: {
          ...action.payload,
        },
      };

    case ActionTypes.APPLY_MATCHES_CHOSE:
      return {
        ...state,
        game: {
          ...state.game,
          player: state.game.player + action.payload,
          playerLog: [...state.game.playerLog, `Взял ${action.payload}`],
          currentMatchesCount: state.game.currentMatchesCount - action.payload,
        },
      };

    case ActionTypes.BOT_CHOSE:
      return {
        ...state,
        game: {
          ...state.game,
          bot: state.game.bot + action.payload,
          botLog: [...state.game.botLog, `Взял ${action.payload}`],
          currentMatchesCount: state.game.currentMatchesCount - action.payload,
        },
      };

    case ActionTypes.RESTART_GAME:
      return {
        ...defaultGameState,
        gameStatus: GameStatusTypes.INGAME,
        gameTurn: state.settings.firstTurn,
        game: {
          ...defaultGameState.game,
          currentMatchesCount: state.settings.totalMatches,
        },
        settings: {
          ...state.settings,
        },
      };

    default:
      return state;
  }
}
