import React from 'react';
import { GameWindow } from './components/GameWindow';

function App() {
  return (
    <div className="root-wrapper">
      <div className="main-window">
        <div className="main-window__wrapper">
          <GameWindow />
        </div>
      </div>
    </div>
  );
}

export default App;
