import React from 'react';
import { GameStatusTypes, GameTurnTypes } from '../../reducer/contracts';
import { MatchIcon } from '../common/MatchIcon';

interface HeaderProps {
  gameStatus: GameStatusTypes;
  gameTurn: GameTurnTypes;
  showSettingsHandler: Function;
}

export const Header: React.FC<HeaderProps> = ({ gameTurn, showSettingsHandler, gameStatus }) => {
  return (
    <div className="game-header">
      <div className="game-header__title">
        {gameStatus !== GameStatusTypes.INGAME ? (
          <>
            <h3 className="">Начните играть</h3>
            <MatchIcon size="small" />
          </>
        ) : gameTurn === GameTurnTypes.ME ? (
          <h3 className="your-turn">Ваш ход</h3>
        ) : (
          <h3 className="enemy-turn">
            Ход соперника <span className="time-icon">⌛</span>
          </h3>
        )}
      </div>
      <div className="game-header__action">
        <button className="btn btn--settings" onClick={() => showSettingsHandler(true)}>
          настройки ⚙️
        </button>
      </div>
    </div>
  );
};
