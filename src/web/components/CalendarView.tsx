import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { CalendarViewContainter, CalendarViewBody, RPanelWrapper } from './CalendarView.style';
import Header from '@wcomponents/header/Header';
import Calendar from '@wcomponents/body/Calendar';
import { useCalendarStores } from '@/stores/StoreProvider';
import { ROUTES } from '@constants/routes';

const CalendarView: React.FC = () => {
  const { uiStore } = useCalendarStores();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === ROUTES.WEB.PATH_MAIN) navigate(`view-mode/${uiStore.viewMode}/date`);
  }, []);

  return (
    <CalendarViewContainter>
      <Header />
      <CalendarViewBody>
        <Calendar />
        <RPanelWrapper>
          <Outlet />
        </RPanelWrapper>
      </CalendarViewBody>
    </CalendarViewContainter>
  );
};

export default CalendarView;
