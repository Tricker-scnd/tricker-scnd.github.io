import React, { useCallback, useContext, useState } from 'react';
import { GameContext } from '../../../../context';
import { GameStatusTypes, GameTurnTypes } from '../../../../reducer/contracts';
import { SwitchButton } from '../../../common/SwitchButton';
import { SettingRow } from './components/SettingRow';

interface SettingsScreenProps {
  showSettingsHandler: Function;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ showSettingsHandler }) => {
  const { useGameContext } = useContext(GameContext);
  const { handlers, matchesInfo, gameInfo } = useGameContext;

  const [errors, setErrors] = useState('');
  const [totalMatches, setTotalMatches] = useState<number>(matchesInfo.totalMatches);
  const [maximumMatchesToChose, setMaximumMatchesToChose] = useState<number>(
    matchesInfo.maximumMatchesToChose,
  );
  const [firstTurn, setFirstTurn] = useState<GameTurnTypes.ME | GameTurnTypes.ENEMY>(
    gameInfo.firstTurn,
  );

  const totalAmountHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = Number(e.target.value);
    if (!isNaN(num)) num < 1001 && setTotalMatches(num);
  };
  const choseCountHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = Number(e.target.value);
    if (!isNaN(num)) num < totalMatches && setMaximumMatchesToChose(num);
  };

  const applySettings = useCallback(() => {
    if (maximumMatchesToChose + 1 >= totalMatches) {
      setErrors('Выбор спичек за ход, должен быть значительно меньше!');
      return;
    }
    if (maximumMatchesToChose < 3) {
      setErrors('Минимальное количество на выбор 3');
      return;
    }
    if (totalMatches < 25) {
      setErrors('Минимальное количество 25 спичек');
      return;
    }
    if (totalMatches % 2 === 0) {
      setErrors('Максимальное количество спичек должно быть нечетным');
      return;
    }
    setErrors('');
    handlers.settingsApplyHandler(totalMatches, maximumMatchesToChose, firstTurn);
    handlers.restartGameHandler();
    showSettingsHandler(false);
  }, [totalMatches, maximumMatchesToChose, firstTurn]);

  return (
    <div className="game-settings__wrapper">
      <button className="btn btn--close" onClick={() => showSettingsHandler(false)}>
        &times;
      </button>
      <h3 className="settings__title">настройки</h3>
      <div className="settings__body">
        <SettingRow title="Первый ход" groupField>
          <SwitchButton
            title="Мой"
            active={firstTurn === GameTurnTypes.ME}
            onClick={() => setFirstTurn(GameTurnTypes.ME)}
          />
          <SwitchButton
            title="Соперника"
            active={firstTurn === GameTurnTypes.ENEMY}
            onClick={() => setFirstTurn(GameTurnTypes.ENEMY)}
          />
        </SettingRow>

        <SettingRow title="Максимальное количество спичек" titleHint="только нечетное число">
          <input type="text" value={totalMatches} onChange={totalAmountHandler} />
          <span className="input-hint">max:1000</span>
        </SettingRow>

        <SettingRow title="Максимум спичек можно взять за ход">
          <input type="text" value={maximumMatchesToChose} onChange={choseCountHandler} />
        </SettingRow>

        <div className="settings__error-label">{errors}</div>
      </div>
      <div className="settings__footer">
        <button className="btn btn--white" onClick={applySettings}>
          Применить {gameInfo.gameStatus !== GameStatusTypes.PREPARE && ' и начать заново'}
        </button>
      </div>
    </div>
  );
};
