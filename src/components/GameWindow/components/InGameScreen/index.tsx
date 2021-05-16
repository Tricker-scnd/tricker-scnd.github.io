import React, {  useContext, useEffect } from 'react';
import useGame from '../../../../hooks/game.hook';
import { GameContext } from '../../../../context';
import { GameTurnTypes } from '../../../../reducer/contracts';
import { GameActions } from './components/GameActions';
import { GameStats } from './components/GameStats';

export const InGameScreen: React.FC = React.memo(() => {
  const { useGameContext } = useContext(GameContext);
  const { handlers, matchesInfo, gameInfo } = useGameContext;
  const { botChose } = useGame();

  useEffect(() => {
    if (gameInfo.gameTurn === GameTurnTypes.ENEMY) botChose();
  }, [gameInfo.gameTurn]);

  return (
    <div className="game-active__wrapper">
      <span className="limit-label">
        Лимит на выбор спичек: <b>{matchesInfo.maximumMatchesToChose} шт.</b>
      </span>
      <GameStats matchesInfo={matchesInfo} />
      <GameActions
        matchesInfo={matchesInfo}
        sendChose={handlers.playerChose}
        turn={gameInfo.gameTurn}
      />
    </div>
  );
});
