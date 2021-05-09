import React, { useContext, useEffect } from 'react';
import useGame from '../../../../gameHook';
import { ContextState, GameContext } from '../../../../context';
import { applyMatchesChose, changeGameTurn } from '../../../../reducer/actions';
import { GameResultTypes, GameStatusTypes, GameTurnTypes } from '../../../../reducer/contracts';
import { GameActions } from './components/GameActions';
import { GameStats } from './components/GameStats';

interface InGameScreenProps {
  gameStatusHandler: (s: GameStatusTypes) => void;
  gameResultHandler: (s: GameResultTypes) => void;
  gameTurnHandler: (s: GameTurnTypes) => void;
  status: GameStatusTypes;
}

export const InGameScreen: React.FC<InGameScreenProps> = ({
  gameStatusHandler,
  gameResultHandler,
  gameTurnHandler,
}) => {
  const { state, dispatch } = useContext(GameContext) as ContextState;

  const matchesInfo = {
    currentMatchesCount: state.game.currentMatchesCount,
    maximumMatchesToChose: state.settings.maximumMatchesToChose,
    totalMatches: state.settings.totalMatches,
  };

  const { botChose, checkGameResult } = useGame(state, dispatch);

  //PERVIY HOD
  useEffect(() => {
    gameTurnHandler(state.settings.firstTurn);
  }, []);

  //PROVERKA POBEDI
  useEffect(() => {
    checkGameResult(gameResultHandler, gameStatusHandler);
  }, [matchesInfo.currentMatchesCount]);

  //OTSLEZHIVANIE HODA
  useEffect(() => {
    if (state.gameTurn === GameTurnTypes.ENEMY) botChose();
  }, [state.gameTurn]);

  const sendChose = (num: number) => {
    dispatch(changeGameTurn(GameTurnTypes.ENEMY));
    dispatch(applyMatchesChose(num));
  };

  return (
    <div className="game-active__wrapper">
      <span className="limit-label">
        Лимит на выбор спичек: <b>{matchesInfo.maximumMatchesToChose} шт.</b>
      </span>
      <GameStats matchesInfo={matchesInfo} />
      <GameActions matchesInfo={matchesInfo} sendChose={sendChose} turn={state.gameTurn} />
    </div>
  );
};
