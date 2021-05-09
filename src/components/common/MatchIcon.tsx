import React from 'react';

interface MatchIconProps {
  size?: string;
}

export const MatchIcon: React.FC<MatchIconProps> = ({ size = 'default' }) => {
  const iconSize = size === 'big' ? 'icon--big' : size === 'small' ? 'icon--small' : '';
  return (
    <span className={`match-icon ${iconSize}`}>
      <i>🔥</i>
      <i></i>
    </span>
  );
};
