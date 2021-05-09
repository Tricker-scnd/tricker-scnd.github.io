import React from 'react';

interface ChoseListProps {
  maxCount: number;
  currentCount: number;
}

export const ChoseList: React.FC<ChoseListProps> = ({ maxCount, currentCount }) => {
  return (
    <>
      {new Array(maxCount >= 10 ? 9 : maxCount).fill(0, 0).map((_, i) => (
        <button
          key={`btn${i}`}
          className={`btn btn--num ${i + 1 > currentCount ? 'btn--no-active' : ''}`}
          data-value={i + 1}>
          {i + 1}
        </button>
      ))}
    </>
  );
};
