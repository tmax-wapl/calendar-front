import React, { useContext, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Outlet } from 'react-router-dom';
import { useCalendarStores } from '@/stores/StoreProvider';
import { RefKey } from '@/stores/UiStore';
import { CalendarContext } from '@contexts/CalendarContext';
import { MODE } from '@constants/common';

const CalendarLayout: React.FC = () => {
  const { mode } = useContext(CalendarContext);
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
          events={[
            {
              title: 'The Title',
              start: '2022-11-11',
              end: '2022-11-14',
              color: '#000000',
            },
            {
              title: 'The Title',
              start: '2022-11-01',
              end: '2022-11-03',
              color: '#000000',
            },
          ]}
        />
      </div>
    );
  });

  const RenderMode = React.memo(() => {
    return (
      <>
        {mode === MODE.FULL ? <LNB /> : null}
        <Outlet />
      </>
    );
  });

  return (
    <div style={{ display: 'flex', width: '100%', height: '100%' }}>
      <RenderMode />
    </div>
  );
};

export default CalendarLayout;
