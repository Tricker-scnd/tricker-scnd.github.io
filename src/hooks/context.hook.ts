import { useReducer } from 'react';
import { GameContextInterface } from '../context';
import reducer, { defaultGameState } from '../reducer';
import {
  applyMatchesChose,
  changeGameResult,
  changeGameStatus,
  changeGameTurn,
  restartGame,
  settingsApply,
} from '../reducer/actions';
import {
  GameResultTypes,
  GameStatusTypes,
  GameTurnTypes,
  PlayersTypes,
} from '../reducer/contracts';

export default function useGameContextHook(): GameContextInterface {
  const [state, dispatch] = useReducer(reducer, defaultGameState);

  const handlers = {
    gameStatusHandler: (status: GameStatusTypes) => {
      dispatch(changeGameStatus(status));
    },
    gameTurnHandler: (turn: GameTurnTypes) => {
      dispatch(changeGameTurn(turn));
    },
    gameResultHandler: (result: GameResultTypes) => {
      dispatch(changeGameResult(result));
    },
    settingsApplyHandler: (
      totalMatches: number,
      maximumMatchesToChose: number,
      firstTurn: GameTurnTypes.ME | GameTurnTypes.ENEMY,
    ) => {
      dispatch(
        settingsApply({
          totalMatches,
          maximumMatchesToChose,
          firstTurn,
        }),
      );
    },
    restartGameHandler: () => {
      dispatch(restartGame());
    },
    playerChose: (num: number) => {
      dispatch(applyMatchesChose(num, PlayersTypes.PLAYER));
    },
    botChoseHandler: (num: number) => {
      dispatch(applyMatchesChose(num, PlayersTypes.BOT));
    },
  };

  const matchesInfo = {
    currentMatchesCount:
      Number(state.settings.totalMatches) - (Number(state.game.player) + Number(state.game.bot)),
    maximumMatchesToChose: state.settings.maximumMatchesToChose,
    totalMatches: state.settings.totalMatches,
  };

  const playersInfo = {
    playerScore: state.game.player,
    botScore: state.game.bot,
    playerLog: state.game.playerLog,
    botLog: state.game.botLog,
  };

  const gameInfo = {
    gameStatus: state.gameStatus,
    gameResult: state.gameResult,
    gameTurn: state.gameTurn,
    firstTurn: state.settings.firstTurn,
  };

  return { handlers, matchesInfo, gameInfo, playersInfo };
}
