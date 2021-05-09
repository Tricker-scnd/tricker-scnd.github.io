import React from 'react';
import { GameState, GameStatusTypes } from '../../reducer/contracts';
import { PlayerStatsBlock } from './PlayerStatsBlock';

interface PlayersProps {
  status: GameStatusTypes;
  gameStats: GameState['game'];
}

export const Players: React.FC<PlayersProps> = ({ status, gameStats }) => {
  return (
    <div className="players-container">
      {status !== GameStatusTypes.PREPARE && (
        <>
          <PlayerStatsBlock count={gameStats.player} playerLog={gameStats.playerLog} />
          <PlayerStatsBlock count={gameStats.bot} playerLog={gameStats.botLog} oponent />
        </>
      )}
    </div>
  );
};
