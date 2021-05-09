import React, { useReducer, useState } from 'react';
import { Header } from '../Header';
import { Players } from '../Players';
import { InGameScreen } from './components/InGameScreen';
import { DefaultScreen } from './components/DefaultScreen';
import { GameResultTypes, GameStatusTypes, GameTurnTypes } from '../../reducer/contracts';
import { GameContext } from '../../context';
import reducer, { defaultGameState } from '../../reducer';
import {
  changeGameResult,
  changeGameStatus,
  changeGameTurn,
  restartGame,
} from '../../reducer/actions';
import { SettingsScreen } from './components/SettingsScreen';

export const GameWindow = () => {
  const [state, dispatch] = useReducer(reducer, defaultGameState);
  const [showSettings, setShowSettings] = useState(false);

  const gameStatusHandler = (status: GameStatusTypes) => {
    dispatch(changeGameStatus(status));
  };
  const gameTurnHandler = (turn: GameTurnTypes) => {
    dispatch(changeGameTurn(turn));
  };
  const gameResultHandler = (result: GameResultTypes) => {
    dispatch(changeGameResult(result));
    gameStatusHandler(GameStatusTypes.FINISHED);
  };
  const restartGameHandler = () => {
    dispatch(restartGame());
  };

  return (
    <GameContext.Provider value={{ dispatch, state }}>
      <div className="game">
        <Header
          gameTurn={state.gameTurn}
          showSettingsHandler={setShowSettings}
          gameStatus={state.gameStatus}
        />

        <div className="game-main-container">
          {state.gameStatus === GameStatusTypes.INGAME ? (
            <InGameScreen
              gameStatusHandler={gameStatusHandler}
              gameResultHandler={gameResultHandler}
              gameTurnHandler={gameTurnHandler}
              status={state.gameStatus}
            />
          ) : (
            <DefaultScreen
              gameStatusHandler={gameStatusHandler}
              restartGameHandler={restartGameHandler}
              status={state.gameStatus}
              result={state.gameResult}
            />
          )}

          {showSettings && <SettingsScreen showSettingsHandler={setShowSettings} />}
        </div>

        <Players status={state.gameStatus} gameStats={state.game} />
      </div>
    </GameContext.Provider>
  );
};
