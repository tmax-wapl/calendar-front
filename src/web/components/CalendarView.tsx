import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@wcomponents/header/Header';
import Calendar from '@wcomponents/body/Calendar';

const CalendarView: React.FC = () => {
  return (
    <div style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
      <Header />
      <div
        style={{
          display: 'flex',
          width: '100%',
          flexDirection: 'row',
          height: 'calc(100vh - 52px)',
        }}
      >
        <Calendar />
        <Outlet />
      </div>
    </div>
  );
};

export default CalendarView;
