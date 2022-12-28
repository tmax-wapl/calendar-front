import React from 'react';
import LNB from './LNB';

import { Outlet } from 'react-router-dom';

const CalendarLayout: React.FC = () => {
  return (
    <div style={{ display: 'flex', width: '100%', height: 'calc(100% - 23px)' }}>
      <LNB />
      <Outlet />
    </div>
  );
};

export default CalendarLayout;
