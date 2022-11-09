import React, { useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Outlet } from 'react-router-dom';
import { useCalendarStores } from '@/stores/StoreProvider';
import { RefKey } from '@/stores/UiStore';

const CalendarLayout: React.FC = () => {
  const { uiStore } = useCalendarStores();
  const LNB = React.memo(() => {
    const calendarRef = useRef<FullCalendar>(null);

    useEffect(() => {
      if (calendarRef) uiStore.setApi(RefKey.MINI, calendarRef?.current?.getApi());
    }, []);

    return (
      <div id="lnb" style={{ width: '320px', height: 'auto', background: '#eeeeee' }}>
        <FullCalendar
          locale="ko"
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
        />
      </div>
    );
  });
  LNB.displayName = 'LNB';

  return (
    <div style={{ display: 'flex', width: '100%', height: '100%' }}>
      <LNB />
      <Outlet />
    </div>
  );
};

export default CalendarLayout;
