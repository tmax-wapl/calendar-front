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
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { AllDayText, AllDayWrapper, ArrowButton, CalendarContainer, FullCalendarWrapper } from './Calendar.style';
import { useCalendarStores } from '@/stores/StoreProvider';
import Popover from '@/common/components/Popover/Popover';
import { DateTime } from 'luxon';
import { VIEW_MODE } from '@/common/constants/common';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

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
  const { viewMode } = useParams();
  const [direction, setDirection] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [moreLinkData, setMoreLinkData] = useState<MoreLink>({
    target: null,
    date: null,
    position: { top: 0, left: 0 },
    events: null,
  });
  const renderDayContent = (content: any) => <span>{content.dayNumberText.slice(0, -1)}</span>;

  const renderAllDayContent = ({ text }: { text: string }) =>
    uiStore.viewMode === VIEW_MODE.WEEK ? (
      <AllDayWrapper>
        <AllDayText>{text}</AllDayText>
        <ArrowButton direction={direction.toString()} onClick={handleArrow} />
      </AllDayWrapper>
    ) : (
      text
    );

  const handleArrow = () => {
    const mainApi = uiStore.getApi();
    direction ? mainApi.setOption('dayMaxEvents', 3) : mainApi.setOption('dayMaxEvents', false);
    setDirection(!direction);
  };

  const handleEventClick = (eventInfo: EventClickArg) => {
    eventInfo.jsEvent.stopPropagation();
    console.log(eventInfo);
  };

  const handleDateClick = (dateInfo: DateClickArg) => {
    const { viewMode } = uiStore;
    viewMode === VIEW_MODE.MONTH ? handleMonthViewClick(dateInfo) : handleDateTimeSelect(dateInfo);
  };

  const handleMonthViewClick = ({ dayEl }: DateClickArg) => {
    setDateDay(dayEl);
    if (!pathname.includes('view-mode')) navigate(`view-mode/${uiStore.viewMode}`);
  };

  const handleDateTimeSelect = ({ dayEl, jsEvent }: DateClickArg) => {
    if (!(jsEvent.target instanceof HTMLElement)) return;
    const { time } = jsEvent.target.dataset;
    setDateDay(dayEl);
    console.log(time);
    console.log(dayEl, jsEvent);
  };

  const setDateDay = (dayEl: HTMLElement) => {
    const { date } = dayEl.dataset;
    const { setDateDay } = uiStore;
    setDateDay(DateTime.fromJSDate(new Date(date)));
  };

  const renderMoreLinkContent = (args: MoreLinkContentArg) => `+ ${args.num}`;

  const renderMoreClick = (args: MoreLinkArgCustom) => {
    switch (uiStore.viewMode) {
      case VIEW_MODE.MONTH:
        renderMoreMonth(args);
        break;
      case VIEW_MODE.WEEK:
        renderMoreWeek();
        break;
      default:
        renderMoreMonth(args);
    }
  };

  const renderMoreMonth = (args: MoreLinkArgCustom) => {
    const { jsEvent, allSegs, date } = args;
    setMoreLinkData({
      date: DateTime.fromJSDate(date).toFormat('MM/dd') + ` (${getDay(date.getDay())})`,
      target: jsEvent?.target,
      position: { top: jsEvent.clientY, left: jsEvent.clientX },
      events: allSegs,
    });
  };

  const renderMoreWeek = () => {
    const mainApi = uiStore.getApi();
    mainApi.setOption('dayMaxEvents', false);
    setDirection(true);
  };

  const getDay = (dayDate: number) => {
    return ['일', '월', '화', '수', '목', '금', '토'][dayDate];
  };

  useEffect(() => {
    if (calendarRef) {
      uiStore.setApi(calendarRef?.current?.getApi());
    }
  }, []);

  useEffect(() => {
    if (viewMode) uiStore.setViewMode(viewMode);
    else uiStore.setViewMode(VIEW_MODE.MONTH);
  }, [viewMode]);

  return (
    <CalendarContainer>
      <FullCalendarWrapper>
        <FullCalendar
          locale="ko"
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={viewMode}
          dayCellContent={renderDayContent}
          eventClick={handleEventClick}
          allDayText="종일"
          events={[
            {
              id: '1',
              title: 'The Title',
              start: '2022-11-11',
              end: '2022-11-15',
              color: 'red',
            },
            {
              id: '2',
              title: '다른거',
              start: '2022-11-11',
              end: '2022-11-13',
              color: '#32a852',
            },
            {
              id: '3',
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
              title: '어나1',
              start: '2022-11-13',
              end: '2022-11-17',
              color: '#4432a8',
            },
            {
              title: '어나2',
              start: '2022-11-13',
              end: '2022-11-18',
              color: 'black',
            },
            {
              title: '어나3',
              start: '2022-11-13',
              end: '2022-11-16',
              color: '#4432a8',
            },
            {
              title: '어나4',
              start: '2022-11-13',
              end: '2022-11-17',
              color: '#4432a8',
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
          allDayContent={renderAllDayContent}
          moreLinkClick={renderMoreClick}
          dateClick={handleDateClick}
        />
        <Popover data={moreLinkData} />
      </FullCalendarWrapper>
    </CalendarContainer>
  );
};

export default React.memo(Calendar);
