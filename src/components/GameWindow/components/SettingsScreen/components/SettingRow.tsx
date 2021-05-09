import React from 'react';

interface SettingRowProps {
  title: string;
  titleHint?: string;
  groupField?: boolean;
}

export const SettingRow: React.FC<SettingRowProps> = ({
  title,
  titleHint,
  groupField,
  children,
}) => {
  return (
    <div className="settings__row">
      <div className="settings__row--title">
        {title}
        {titleHint && <span>({titleHint})</span>}
      </div>
      <div className={`settings__row--field ${groupField ? 'settings__row--group-field' : ''}`}>
        {children}
      </div>
    </div>
  );
};
