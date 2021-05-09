import React from 'react';
import { MatchIcon } from '../../common/MatchIcon';
import { PlayerLog } from './components/PlayerLog';

interface PlayerStatsBlockProps {
  oponent?: boolean;
  count: number;
  playerLog: string[];
}

export const PlayerStatsBlock: React.FC<PlayerStatsBlockProps> = ({
  oponent,
  count,
  playerLog,
}) => {
  return (
    <>
      {oponent ? (
        <div className="players-container__column">
          <h4 className="oponent">Соперник</h4>
          <div className="player-stats__wrapper">
            <div className="player-stats-container">
              <MatchIcon />
              <div className="player-stats__counter">{count}</div>
            </div>
            <PlayerLog playerLog={playerLog} />
          </div>
        </div>
      ) : (
        <div className="players-container__column">
          <h4>Вы</h4>
          <div className="player-stats__wrapper">
            <div className="player-stats-container">
              <MatchIcon />
              <div className="player-stats__counter">{count}</div>
            </div>
            <PlayerLog playerLog={playerLog} oponent />
          </div>
        </div>
      )}
    </>
  );
};
