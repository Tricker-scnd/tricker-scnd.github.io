import { useContext } from 'react';
import { GameContext } from '../context';
import { GameTurnTypes } from '../reducer/contracts';
import { isEven, numWithModClassic, numWithModCustom, randomInteger } from '../utils';

export default function useGame() {
  const { useGameContext } = useContext(GameContext);
  const { playersInfo, gameInfo, matchesInfo, handlers } = useGameContext;

  const winCondition = (score: number, current: number) => {
    if (current > matchesInfo.maximumMatchesToChose) {
      let delta = current - matchesInfo.maximumMatchesToChose; //вычисление остатка при потенциальном выборе

      if (delta === 1 && isEven(playersInfo.playerScore)) {
        //пользователь остается с нечетным числом, победа бота
        return matchesInfo.maximumMatchesToChose;
      } else {
        return numWithModClassic(current, matchesInfo.maximumMatchesToChose);
      }
    } else {
      if (isEven(score + current)) return current; //Последний ход бота для победы
      if (current !== 0) return current === 1 ? 1 : current - 1; //Последний ход бота для проигрыша
    }
    return 0;
  };

  const botChose = () => {
    setTimeout(() => {
      if (matchesInfo.currentMatchesCount === 0) return;
      let num;

      const changedTotal = ((matchesInfo.totalMatches - 1) / 2) % 4 !== 0;
      const changedChose = matchesInfo.maximumMatchesToChose % 2 === 0;

      //предпоследний и последний ход
      if (matchesInfo.maximumMatchesToChose * 2 > matchesInfo.currentMatchesCount) {
        num = winCondition(playersInfo.botScore, matchesInfo.currentMatchesCount);
        handlers.botChoseHandler(num);
        return;
      }

      //игра при измененных настройках
      if (changedTotal || changedChose) {
        num = numWithModCustom(
          matchesInfo.currentMatchesCount,
          matchesInfo.maximumMatchesToChose,
          gameInfo.firstTurn === GameTurnTypes.ENEMY && playersInfo.botScore === 0,
          playersInfo.botScore,
        );
        handlers.botChoseHandler(num);
        return;
      }

      //игра при стандартных настройках
      if (gameInfo.firstTurn === GameTurnTypes.ENEMY) {
        num = randomInteger(matchesInfo.currentMatchesCount, matchesInfo.maximumMatchesToChose);
      } else
        num = numWithModClassic(matchesInfo.currentMatchesCount, matchesInfo.maximumMatchesToChose);
      handlers.botChoseHandler(num);
    }, 1500);
  };

  return { botChose };
}
