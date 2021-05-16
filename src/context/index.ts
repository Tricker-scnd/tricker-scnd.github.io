import React from 'react';
import { GameResultTypes, GameStatusTypes, GameTurnTypes } from '../reducer/contracts';

export interface GameContextInterface {
  handlers: {
    gameStatusHandler: (t: GameStatusTypes) => void;
    gameTurnHandler: (t: GameTurnTypes) => void;
    gameResultHandler: (t: GameResultTypes) => void;
    settingsApplyHandler: (
      total: number,
      max: number,
      turn: GameTurnTypes.ME | GameTurnTypes.ENEMY,
    ) => void;
    restartGameHandler: () => void;
    playerChose: (t: number) => void;
    botChoseHandler: (t: number) => void;
  };
  playersInfo: {
    playerScore: number;
    botScore: number;
    playerLog: string[];
    botLog: string[];
  };
  gameInfo: {
    gameStatus: GameStatusTypes;
    gameResult: GameResultTypes;
    gameTurn: GameTurnTypes;
    firstTurn: GameTurnTypes.ME | GameTurnTypes.ENEMY;
  };
  matchesInfo: {
    currentMatchesCount: number;
    maximumMatchesToChose: number;
    totalMatches: number;
  };
}

export type ContextState = {
  useGameContext: GameContextInterface;
};

export const GameContext = React.createContext<ContextState>({} as ContextState);
