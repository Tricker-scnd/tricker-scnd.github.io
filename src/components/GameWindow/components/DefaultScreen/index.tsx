import React from 'react';
import { GameResultTypes, GameStatusTypes } from '../../../../reducer/contracts';

interface DefaultScreenProps {
  gameStatusHandler: (s: GameStatusTypes) => void;
  restartGameHandler: () => void;
  status: GameStatusTypes;
  result: GameResultTypes;
}

export const DefaultScreen: React.FC<DefaultScreenProps> = ({
  gameStatusHandler,
  restartGameHandler,
  status,
  result,
}) => {
  return (
    <div className="game-prepare__wrapper">
      {status === GameStatusTypes.PREPARE ? (
        <button className="btn" onClick={() => gameStatusHandler(GameStatusTypes.INGAME)}>
          Начать игру
        </button>
      ) : (
        status === GameStatusTypes.FINISHED && (
          <div className="game-result__container">
            {result === GameResultTypes.WIN ? (
              <h3 className="win">Победа !</h3>
            ) : (
              <h3 className="lose">Поражение</h3>
            )}
            <button
              className="btn"
              onClick={() => {
                gameStatusHandler(GameStatusTypes.INGAME);
                restartGameHandler();
              }}>
              Начать заново
            </button>
          </div>
        )
      )}
    </div>
  );
};
