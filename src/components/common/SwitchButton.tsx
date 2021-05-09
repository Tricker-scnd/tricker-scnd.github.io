import React from 'react';

interface SwitchButtonProps {
  title: string;
  active?: boolean;
  onClick: () => void;
}

export const SwitchButton: React.FC<SwitchButtonProps> = ({ title, active = false, onClick }) => {
  return (
    <button className={`btn switch-btn ${active && 'switch-btn--active'}`} onClick={onClick}>
      {title}
    </button>
  );
};
