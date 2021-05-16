export enum GameStatusTypes {
  PREPARE = 'PREPARE',
  INGAME = 'INGAME',
  FINISHED = 'FINISHED',
}

export enum GameResultTypes {
  WIN = 'WIN',
  LOSE = 'LOSE',
  NEVER = 'NEVER',
}

export enum GameTurnTypes {
  ME = 'ME',
  ENEMY = 'ENEMY',
  NEVER = 'NEVER',
}

export enum PlayersTypes {
  PLAYER = 'PLAYER',
  BOT = 'BOT',
}

export interface GameState {
  gameStatus: GameStatusTypes;
  gameResult: GameResultTypes;
  gameTurn: GameTurnTypes;
  game: {
    player: number;
    bot: number;
    playerLog: string[];
    botLog: string[];
  };
  settings: {
    totalMatches: number;
    maximumMatchesToChose: number;
    firstTurn: GameTurnTypes.ME | GameTurnTypes.ENEMY;
  };
}
