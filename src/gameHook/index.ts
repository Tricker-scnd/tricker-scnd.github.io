import { ContextState } from '../context';
import { botMatchesChose, changeGameTurn } from '../reducer/actions';
import { GameResultTypes, GameStatusTypes, GameTurnTypes } from '../reducer/contracts';

const randomInteger = (min: number, max: number) => {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
};

const isEven = (n: number) => {
  return n % 2 === 0;
};

export default function useGame(state: ContextState['state'], dispatch: ContextState['dispatch']) {
  const maximumToChose = state.settings.maximumMatchesToChose;
  const current = state.game.currentMatchesCount;
  const playerScore = state.game.player;
  const botScore = state.game.bot;

  const winCondition = (score: number, rest: number) => {
    if (rest > maximumToChose) {
      let delta = rest - maximumToChose;
      if (delta === 1 && isEven(playerScore)) {
        return maximumToChose;
      } else {
        if (isEven(botScore + 1)) {
          return 1;
        }
        return 2;
      }
    } else {
      if (isEven(score + rest)) return rest;
      if (rest !== 0) return rest === 1 ? 1 : rest - 1;
    }
    return 0;
  };

  const botChose = () => {
    setTimeout(() => {
      if (current === 0) return;
      const possibleNum = maximumToChose <= current ? maximumToChose : current;
      let num;
      if (maximumToChose * 2 > current) num = winCondition(botScore, current);
      else num = randomInteger(1, possibleNum);

      dispatch(botMatchesChose(num));
      dispatch(changeGameTurn(GameTurnTypes.ME));
    }, 1500);
  };

  const checkGameResult = (resultHandler: Function, statusHandler: Function) => {
    if (current === 0) {
      if (isEven(playerScore)) {
        resultHandler(GameResultTypes.WIN);
      } else {
        resultHandler(GameResultTypes.LOSE);
      }
      statusHandler(GameStatusTypes.FINISHED);
      return;
    }
  };

  return { botChose, checkGameResult };
}
