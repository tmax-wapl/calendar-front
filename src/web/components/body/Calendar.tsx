import React, { useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { CalendarContainer } from './Calendar.style';

const Calendar: React.FC = () => {
  const calendarRef = useRef<FullCalendar>(null);

  const renderDayContent = (content: any) => <span>{content.dayNumberText.slice(0, -1)}</span>;

  useEffect(() => {
    if (calendarRef) {
      console.log(calendarRef?.current?.getApi());
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
