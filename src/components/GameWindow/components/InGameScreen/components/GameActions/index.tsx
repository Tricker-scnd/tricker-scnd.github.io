import React, { useCallback, useState } from 'react';
import { GameTurnTypes } from '../../../../../../reducer/contracts';
import { ChoseList } from '../../../../../common/ChoseList';

interface GameActionsProps {
  matchesInfo: {
    currentMatchesCount: number;
    maximumMatchesToChose: number;
    totalMatches: number;
  };
  sendChose: (t: number) => void;
  turn: GameTurnTypes;
}

export const GameActions: React.FC<GameActionsProps> = ({ matchesInfo, sendChose, turn }) => {
  const [showChoseLine, setShowChoseLine] = useState(false);
  const [choseCount, setChoseCount] = useState(0);

  const ChoseHandler = (e: any) => {
    if (e.target.classList.contains('btn')) {
      const num = Number(e.target.dataset.value);
      if (ChoseCheck(num)) {
        sendChose(num);
        setShowChoseLine(false);
      }
    }
  };

  const ChoseCheck = useCallback(
    (t: number, zero?: boolean) => {
      if (!isNaN(t))
        if (
          t > (zero ? -1 : 0) &&
          t <= matchesInfo.currentMatchesCount &&
          t <= matchesInfo.maximumMatchesToChose
        )
          return true;
      return false;
    },
    [matchesInfo.maximumMatchesToChose],
  );

  const typeChosehandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = Number(e.target.value);
    ChoseCheck(num, true) && setChoseCount(num);
  };

  const choseApply = () => {
    if (ChoseCheck(choseCount)) {
      sendChose(choseCount);
      setShowChoseLine(false);
    }
  };

  return (
    <div className="actions-block">
      <div className="actions-block__line action-line--first">
        <button
          className={`btn ${showChoseLine || (turn !== GameTurnTypes.ME && 'btn--no-active')}`}
          onClick={() => {
            turn === GameTurnTypes.ME && setShowChoseLine(true);
          }}>
          Выбрать спички
        </button>
      </div>

      <div className="actions-block__line">
        {showChoseLine && (
          <>
            <div className="actions-block__title">Выберите кол-во спичек:</div>
            <div className="actions-block__buttons-container" onClick={ChoseHandler}>
              <ChoseList
                maxCount={matchesInfo.maximumMatchesToChose}
                currentCount={matchesInfo.currentMatchesCount}
              />
              {matchesInfo.maximumMatchesToChose >= 10 && (
                <>
                  <label className="actions-block__label">Либо введите число</label>
                  <div className="actions-block__input-container">
                    <input
                      type="number"
                      placeholder="Введите число"
                      onChange={typeChosehandler}
                      value={choseCount}
                    />
                    <button
                      className={`btn btn--apply-chose ${choseCount === 0 && 'btn--no-active'}`}
                      onClick={choseApply}>
                      Принять
                    </button>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
