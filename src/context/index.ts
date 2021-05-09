import React, { Dispatch } from 'react';
import { GameActions } from '../reducer/actions';
import { GameState } from '../reducer/contracts';

export type ContextState = {
  state: GameState;
  dispatch: Dispatch<GameActions>;
};

type defContext = ContextState | null;

export const GameContext = React.createContext<defContext>(null);
