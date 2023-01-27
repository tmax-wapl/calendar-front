import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Header from '@wcomponents/header/Header';
import Calendar from '@wcomponents/body/Calendar';
import { useCalendarStores } from '@/stores/StoreProvider';
import { ROUTES } from '@/common/constants';

const CalendarView: React.FC = () => {
  const { uiStore } = useCalendarStores();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === ROUTES.PATH_MAIN) navigate(`view-mode/${uiStore.viewMode}/date`);
  }, []);

  return (
    <div style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
      <Header />
      <div
        style={{
          display: 'flex',
          width: '100%',
          flexDirection: 'row',
          height: 'calc(100% - 62px)',
        }}
      >
        <Calendar />
        <Outlet />
      </div>
    </div>
  );
};

export default CalendarView;
