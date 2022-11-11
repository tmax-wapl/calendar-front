import React, { useEffect, useRef } from 'react';
import FullCalendar, { EventClickArg } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarContainer, FullCalendarWrapper } from './Calendar.style';
import { useCalendarStores } from '@/stores/StoreProvider';
import { RefKey } from '@/stores/UiStore';

const Calendar: React.FC = () => {
  const calendarRef = useRef<FullCalendar>(null);
  const calRef = useRef<HTMLDivElement>(null);
  const { uiStore } = useCalendarStores();

  const renderDayContent = (content: any) => <span>{content.dayNumberText.slice(0, -1)}</span>;

  useEffect(() => {
    if (calendarRef) {
      uiStore.setApi(RefKey.MAIN, calendarRef?.current?.getApi());
    }
  }, []);

  const handleEventClick = (eventInfo: EventClickArg) => {
    eventInfo.jsEvent.stopPropagation();
    console.log(eventInfo);
  };

  const handleDateClick = (e: any) => {
    // event delegation을 위함
    if (e.target.closest('.fc-col-header-cell-cushion')) return;
    const { date } = e?.target?.closest('td')?.dataset;
    console.log(date);
  };

  return (
    <CalendarContainer>
      <FullCalendarWrapper onClick={handleDateClick}>
        <FullCalendar
          locale="ko"
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          dayCellContent={renderDayContent}
          eventClick={handleEventClick}
          events={[
            {
              title: 'The Title',
              start: '2022-11-11',
              end: '2022-11-15',
              color: 'red',
            },
            {
              title: '다른거',
              start: '2022-11-11',
              end: '2022-11-13',
              color: '#32a852',
            },
            {
              title: '어나더~',
              start: '2022-11-11',
              end: '2022-11-18',
              color: '#4432a8',
            },
            {
              title: 'The Title',
              start: '2022-11-01',
              end: '2022-11-04',
              color: '#000000',
            },
          ]}
        />
      </FullCalendarWrapper>
    </CalendarContainer>
  );
};

export default Calendar;
