import React from 'react';

interface PlayerLogProps {
  oponent?: boolean;
  playerLog: string[];
}

export const PlayerLog: React.FC<PlayerLogProps> = ({ oponent, playerLog }) => {
  const opp = oponent ? 'bot' : 'player';
  
  return (
    <div className="player-stats__log">
      {playerLog.map((action, i) => (
        <div className="player-stats__action" key={action + opp + i}>
          {action}
        </div>
      ))}
    </div>
  );
};
