import React, { useContext, useMemo, useState } from 'react';
import { Header } from '../Header';
import { Players } from '../Players';
import { InGameScreen } from './components/InGameScreen';
import { DefaultScreen } from './components/DefaultScreen';
import { GameStatusTypes } from '../../reducer/contracts';
import { GameContext } from '../../context';
import { SettingsScreen } from './components/SettingsScreen';

export const GameWindow = () => {
  const [showSettings, setShowSettings] = useState(false);
  const { useGameContext } = useContext(GameContext);
  const { gameInfo } = useMemo(() => useGameContext, [useGameContext]);

  return (
    <div className="game">
      <Header showSettingsHandler={setShowSettings} gameInfo={gameInfo} />

      <div className="game-main-container">
        {gameInfo.gameStatus === GameStatusTypes.INGAME ? <InGameScreen /> : <DefaultScreen />}
        {showSettings && <SettingsScreen showSettingsHandler={setShowSettings} />}
      </div>

      <Players />
    </div>
  );
};
