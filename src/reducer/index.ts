import { ActionTypes, GameActions } from './actions';
import {
  GameResultTypes,
  GameState,
  GameStatusTypes,
  GameTurnTypes,
  PlayersTypes,
} from './contracts';

export const defaultGameState: GameState = {
  gameResult: GameResultTypes.NEVER,
  gameStatus: GameStatusTypes.PREPARE,
  gameTurn: GameTurnTypes.NEVER,
  game: {
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

export default function reducer(state: GameState, action: GameActions) {

  switch (action.type) {
    case ActionTypes.CHANGE_GAME_STATUS:
      if (action.payload === GameStatusTypes.INGAME)
        return {
          ...state,
          gameStatus: action.payload,
          gameTurn: state.settings.firstTurn,
        };

      return {
        ...state,
        gameStatus: action.payload,
      };
    case ActionTypes.CHANGE_GAME_RESULT:
      return {
        ...state,
        gameStatus: GameStatusTypes.FINISHED,
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
      const { num, player } = action.payload as { num: number; player: PlayersTypes };
      
      const changes = {
        gameResult: state.gameResult,
        gameStatus: state.gameStatus,
        gameTurn: state.gameTurn,

        playerScore: state.game.player,
        botScore: state.game.bot,

        playerLog: [...state.game.playerLog],
        botLog: [...state.game.botLog],
      };

      if (player === PlayersTypes.PLAYER) {
        changes.playerScore = state.game.player + action.payload.num;
        changes.playerLog = [...state.game.playerLog, `Взял ${num}`];
        changes.gameTurn = GameTurnTypes.ENEMY;
      } else if (player === PlayersTypes.BOT) {
        changes.botScore = state.game.bot + action.payload.num;
        changes.botLog = [...state.game.botLog, `Взял ${num}`];
        changes.gameTurn = GameTurnTypes.ME;
      }

      if (state.settings.totalMatches - changes.playerScore - changes.botScore <= 0) {
        changes.gameStatus = GameStatusTypes.FINISHED;
        if (changes.playerScore % 2 === 0) {
          changes.gameResult = GameResultTypes.WIN;
        } else {
          changes.gameResult = GameResultTypes.LOSE;
        }
      }

      return {
        ...state,
        gameStatus: changes.gameStatus,
        gameTurn: changes.gameTurn,
        gameResult: changes.gameResult,
        game: {
          player: changes.playerScore,
          playerLog: changes.playerLog,
          bot: changes.botScore,
          botLog: changes.botLog,
        },
      };

    case ActionTypes.RESTART_GAME:
      return {
        gameResult: GameResultTypes.NEVER,
        gameStatus: GameStatusTypes.INGAME,
        gameTurn: state.settings.firstTurn,
        game: {
          player: 0,
          bot: 0,
          playerLog: [],
          botLog: [],
        },
        settings: {
          ...state.settings,
        },
      };

    default:
      return state;
  }
}
