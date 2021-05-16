import React from 'react';
import { GameWindow } from './components/GameWindow';
import { GameContext } from './context';
import useGameContextHook from './hooks/context.hook';

function App() {
  const useGameContext = useGameContextHook();

  return (
    <GameContext.Provider value={{ useGameContext }}>
      <div className="root-wrapper">
        <div className="main-window">
          <div className="main-window__wrapper">
            <GameWindow />
          </div>
        </div>
      </div>
    </GameContext.Provider>
  );
}

export default App;
