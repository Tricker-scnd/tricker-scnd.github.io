import React from 'react';
import { MatchIcon } from '../../../../../common/MatchIcon';

interface GameStatsProps {
  matchesInfo: {
    currentMatchesCount: number;
    maximumMatchesToChose: number;
    totalMatches: number;
  };
}

export const GameStats: React.FC<GameStatsProps> = ({ matchesInfo }) => {
  return (
    <div className="matches-stats">
      <MatchIcon size="big" />
      <div className="matches-stats__counter">
        <span className="counter-item">{matchesInfo.currentMatchesCount}</span>
        <span className="counter-item">/</span>
        <span className="counter-item">{matchesInfo.totalMatches}</span>
      </div>
    </div>
  );
};
