import React from 'react';
import { Outlet } from 'react-router-dom';

const CalendarLayout: React.FC = () => {
  const LNB = React.memo(() => {
    return (
      <div id="lnb" style={{ width: '320px', height: 'auto', background: '#eeeeee' }}>
        lNB 입니다.
      </div>
    );
  });

  return (
    <div style={{ display: 'flex', width: '100%', height: '100%' }}>
      <LNB />
      <Outlet />
    </div>
  );
};

export default CalendarLayout;
