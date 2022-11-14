import React, { useEffect, useRef, useState } from 'react';
import FullCalendar, {
  EventClickArg,
  EventSegment,
  MoreLinkArg,
  MoreLinkContentArg,
  VUIEvent,
} from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarContainer, FullCalendarWrapper } from './Calendar.style';
import { useCalendarStores } from '@/stores/StoreProvider';
import { RefKey } from '@/stores/UiStore';
import Popover from '@/common/components/Popover/Popover';
import { DateTime } from 'luxon';

interface VUIEventWithPosition extends VUIEvent {
  clientX?: number;
  clientY?: number;
}

interface MoreLinkArgCustom extends MoreLinkArg {
  jsEvent: VUIEventWithPosition;
}

export type MoreLink = {
  target?: EventTarget;
  date: string;
  position: { top: number; left: number };
  events: EventSegment[];
};

const Calendar: React.FC = () => {
  const calendarRef = useRef<FullCalendar>(null);
  const { uiStore } = useCalendarStores();
  const [moreLinkData, setMoreLinkData] = useState<MoreLink>({
    target: null,
    date: null,
    position: { top: 0, left: 0 },
    events: null,
  });
  const renderDayContent = (content: any) => <span>{content.dayNumberText.slice(0, -1)}</span>;

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

  const renderMoreLinkContent = (args: MoreLinkContentArg) => `+ ${args.num}`;

  const renderMoreClick = (args: MoreLinkArgCustom) => {
    const { jsEvent, allSegs, date } = args;
    setMoreLinkData({
      date: DateTime.fromJSDate(date).toFormat('MM/dd') + ` (${getDay(date.getDay())})`,
      target: jsEvent?.target,
      position: { top: jsEvent.clientY, left: jsEvent.clientX },
      events: allSegs,
    });
  };

  const getDay = (dayDate: number) => {
    return ['일', '월', '화', '수', '목', '금', '토'][dayDate];
  };

  useEffect(() => {
    if (calendarRef) {
      uiStore.setApi(RefKey.MAIN, calendarRef?.current?.getApi());
    }
  }, []);

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
              end: '2022-11-20',
              color: '#4432a8',
            },
            {
              title: '1234~',
              start: '2022-11-11',
              end: '2022-11-22',
              color: '#32a852',
            },
            {
              title: '3456~',
              start: '2022-11-11',
              end: '2022-11-24',
              color: 'orange',
            },
            {
              title: '5678~',
              start: '2022-11-11',
              end: '2022-11-26',
              color: 'green',
            },
            {
              title: 'The Title',
              start: '2022-11-01',
              end: '2022-11-04',
              color: '#000000',
            },
          ]}
          dayMaxEvents={5}
          moreLinkContent={renderMoreLinkContent}
          moreLinkClick={renderMoreClick}
        />
      </FullCalendarWrapper>
      <Popover data={moreLinkData} />
    </CalendarContainer>
  );
};

export default Calendar;
