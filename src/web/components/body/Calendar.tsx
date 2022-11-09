import React, { useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { CalendarContainer } from './Calendar.style';
import { useCalendarStores } from '@/stores/StoreProvider';
import { RefKey } from '@/stores/UiStore';

const Calendar: React.FC = () => {
  const calendarRef = useRef<FullCalendar>(null);
  const { uiStore } = useCalendarStores();

  const renderDayContent = (content: any) => <span>{content.dayNumberText.slice(0, -1)}</span>;

  useEffect(() => {
    if (calendarRef) {
      uiStore.setApi(RefKey.MAIN, calendarRef?.current?.getApi());
    }
  }, []);

  return (
    <CalendarContainer>
      <FullCalendar
        locale="ko"
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        dayCellContent={renderDayContent}
      />
    </CalendarContainer>
  );
};

export default Calendar;
