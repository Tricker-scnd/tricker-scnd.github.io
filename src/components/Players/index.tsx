import React, { useContext } from 'react';
import { GameContext } from '../../context';
import { GameStatusTypes } from '../../reducer/contracts';
import { PlayerStatsBlock } from './PlayerStatsBlock';

export const Players: React.FC = React.memo(() => {
  const { useGameContext } = useContext(GameContext);
  const { gameInfo, playersInfo } = useGameContext;

  return (
    <div className="players-container">
      {gameInfo.gameStatus !== GameStatusTypes.PREPARE && (
        <>
          <PlayerStatsBlock count={playersInfo.playerScore} playerLog={playersInfo.playerLog} />
          <PlayerStatsBlock count={playersInfo.botScore} playerLog={playersInfo.botLog} oponent />
        </>
      )}
    </div>
  );
});
