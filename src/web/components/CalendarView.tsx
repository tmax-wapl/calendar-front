import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const CalendarView: React.FC = () => {
  const Header: React.FC = React.memo(() => {
    return <div style={{ display: 'flex', width: '100%', height: '30px', background: 'orange' }}>Header 이다 ~~~</div>;
  });

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
        <div style={{ display: 'flex', width: '100%', background: 'yellow' }}>전체 뷰이다~~~~</div>
        <Outlet />
      </div>
    </div>
  );
};

export default CalendarView;
