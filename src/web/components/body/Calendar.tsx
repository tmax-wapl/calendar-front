import React, { useEffect, useRef, useState } from 'react';
import FullCalendar, {
  diffDayAndTime,
  EventClickArg,
  EventContentArg,
  EventSegment,
  MoreLinkArg,
  MoreLinkContentArg,
  VUIEvent,
} from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import {
  AllDayText,
  AllDayWrapper,
  ArrowButton,
  CalendarContainer,
  EventSpan,
  EventWrpper,
  FullCalendarWrapper,
} from './Calendar.style';
import { useCalendarStores } from '@/stores/StoreProvider';
import Popover from '@/common/components/Popover/Popover';
import { DateTime } from 'luxon';
import { VIEW_MODE } from '@/common/constants/common';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ContextMenu } from '@common/components/Contextmenu';
import { diffTime } from '@/utils';

interface VUIEventWithPosition extends VUIEvent {
  clientX?: number;
  clientY?: number;
}

interface MoreLinkArgCustom extends MoreLinkArg {
  jsEvent: VUIEventWithPosition;
}

export type ClickArg = {
  target?: HTMLElement;
  date?: string;
  position: { top: number; left: number };
  events?: EventSegment[];
  color?: string;
};

const Calendar: React.FC = () => {
  const calendarRef = useRef<FullCalendar>(null);
  const { uiStore } = useCalendarStores();
  const { viewMode } = useParams();
  const [direction, setDirection] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [moreLinkData, setMoreLinkData] = useState<ClickArg>({
    target: null,
    date: null,
    position: { top: 0, left: 0 },
    events: null,
  });
  const [eventInfo, setEventInfo] = useState<ClickArg>({
    target: null,
    position: { top: 0, left: 0 },
    color: '',
  });
  let timer: number;
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

  const renderMoreLinkContent = (args: MoreLinkContentArg) => `+ ${args.num}`;

  const renderEventContent = ({ event, timeText, backgroundColor }: EventContentArg) => {
    const { startStr, endStr } = event;
    const { minutes } = diffTime(startStr, endStr);
    const isHalfLess = minutes <= 30;

    return uiStore.viewMode === VIEW_MODE.MONTH ? (
      <EventWrpper data-color={backgroundColor} isHalfLess>
        {event.title}
      </EventWrpper>
    ) : (
      <EventWrpper data-color={backgroundColor} isHalfLess={isHalfLess}>
        <EventSpan>{event.title}</EventSpan>
        {minutes >= 60 && <EventSpan>{timeText}</EventSpan>}
      </EventWrpper>
    );
  };

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
    const target = jsEvent.target as HTMLElement;
    setMoreLinkData({
      date: DateTime.fromJSDate(date).toFormat('MM/dd') + ` (${getDay(date.getDay())})`,
      target,
      position: { top: jsEvent.clientY, left: jsEvent.clientX },
      events: allSegs,
    });
  };

  const renderMoreWeek = () => {
    const mainApi = uiStore.getApi();
    mainApi.setOption('dayMaxEvents', false);
    setDirection(true);
  };

  const handleArrow = () => {
    const mainApi = uiStore.getApi();
    direction ? mainApi.setOption('dayMaxEvents', 3) : mainApi.setOption('dayMaxEvents', false);
    setDirection(!direction);
  };

  const handleEventClick = ({ event, jsEvent }: EventClickArg) => {
    jsEvent.stopPropagation();
    console.log(jsEvent, event);
  };

  const clear = () => {
    if (timer) {
      clearTimeout(timer);
      timer = undefined;
    }
  };

  const handleClick = (dateInfo: DateClickArg) => {
    dateInfo.jsEvent.stopPropagation();
    clear();
    if (dateInfo.jsEvent.detail === 1) {
      timer = setTimeout(() => {
        handleDateClick(dateInfo);
      }, 200);
    }
    if (dateInfo.jsEvent.detail % 2 === 0) handleDoubleClick(dateInfo);
  };

  const handleDateClick = (dateInfo: DateClickArg) => {
    const { viewMode } = uiStore;
    viewMode === VIEW_MODE.MONTH ? handleMonthViewClick(dateInfo) : handleDateTimeSelect(dateInfo);
  };

  const handleDoubleClick = (dateInfo: DateClickArg) => {
    // TODO: 새 일정 화면 띄워주기
    console.log(dateInfo);
    console.log('더블클릭');
  };

  const handleRightClick = (e: any) => {
    e.preventDefault(); // 기존 브라우저 우클릭 동작 제어
    const target = e.target?.closest('.fc-daygrid-event') || e.target?.closest('.fc-timegrid-event');
    if (!target) return;

    const { color } = e.target?.querySelector('span')?.dataset;
    setEventInfo({
      target,
      position: { top: e.clientY, left: e.clientX },
      color,
    });
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

  const getDay = (dayDate: number) => ['일', '월', '화', '수', '목', '금', '토'][dayDate];

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
      <FullCalendarWrapper onContextMenu={handleRightClick}>
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
              start: '2022-11-28',
              end: '2022-12-01',
              color: '#FF5154',
            },
            {
              id: '2',
              title: '다른거',
              start: '2022-11-30',
              end: '2022-12-07',
              color: '#FCBB00',
            },
            {
              id: '3',
              title: '어나더~',
              start: '2022-12-11',
              end: '2022-12-20',
              color: '#00C1B1',
            },
            {
              title: '1234~',
              start: '2022-12-11',
              end: '2022-12-22',
              color: '#FF8E3D',
            },
            {
              title: '3456~',
              start: '2022-12-11',
              end: '2022-12-24',
              color: '#A143FF',
            },
            {
              title: '5678~',
              start: '2022-12-11',
              end: '2022-12-26',
              color: '#383FCA',
            },
            {
              title: '어나1',
              start: '2022-12-13',
              end: '2022-12-17',
              color: '#FF46B5',
            },
            {
              title: '테스트 일정',
              start: '2022-12-04T15:00:00',
              end: '2022-12-04T15:15:00',
              color: '#FF46B5',
              display: 'block',
            },
            {
              title: '2223123',
              start: '2022-12-04T16:00:00',
              end: '2022-12-04T16:30:00',
              color: '#3384FF',
              display: 'block',
            },
            {
              title: '2223123',
              start: '2022-12-04T17:00:00',
              end: '2022-12-04T17:45:00',
              color: '#AECB00',
              display: 'block',
            },
            {
              title: '2223123',
              start: '2022-12-04T18:00:00',
              end: '2022-12-04T19:00:00',
              color: '#3384FF',
              display: 'block',
            },

            {
              title: '어나2',
              start: '2022-12-13',
              end: '2022-12-18',
              color: '#3384FF',
            },
            {
              title: '어나3',
              start: '2022-12-13',
              end: '2022-12-16',
              color: '#AECB00',
            },
            {
              title: '어나4',
              start: '2022-12-13',
              end: '2022-12-17',
              color: '#FCBB00',
            },
            {
              title: 'The Title',
              start: '2022-12-01',
              end: '2022-12-04',
              color: '#00C064',
            },
          ]}
          dayMaxEvents={5}
          moreLinkContent={renderMoreLinkContent}
          allDayContent={renderAllDayContent}
          moreLinkClick={renderMoreClick}
          dateClick={handleClick}
          eventContent={renderEventContent}
          nowIndicator
        />
        <Popover {...moreLinkData} />
      </FullCalendarWrapper>
      <ContextMenu {...eventInfo} />
    </CalendarContainer>
  );
};

export default React.memo(Calendar);
