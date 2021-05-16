import React, { useContext } from 'react';
import { GameContext } from '../../../../context';
import { GameResultTypes, GameStatusTypes } from '../../../../reducer/contracts';

export const DefaultScreen: React.FC = () => {
  const { useGameContext } = useContext(GameContext);
  const { handlers, gameInfo } = useGameContext;

  return (
    <div className="game-prepare__wrapper">
      {gameInfo.gameStatus === GameStatusTypes.PREPARE ? (
        <button className="btn" onClick={() => handlers.gameStatusHandler(GameStatusTypes.INGAME)}>
          Начать игру
        </button>
      ) : (
        gameInfo.gameStatus === GameStatusTypes.FINISHED && (
          <div className="game-result__container">
            {gameInfo.gameResult === GameResultTypes.WIN ? (
              <h3 className="win">Победа !</h3>
            ) : (
              <h3 className="lose">Поражение</h3>
            )}
            <button
              className="btn"
              onClick={() => {
                handlers.gameStatusHandler(GameStatusTypes.INGAME);
                handlers.restartGameHandler();
              }}>
              Начать заново
            </button>
          </div>
        )
      )}
    </div>
  );
};
