import React, { useContext, useEffect, useRef, useState } from 'react';
import FullCalendar, {
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
  EventWrapper,
  WeekEventWrapper,
  CalendarColor,
  FullCalendarWrapper,
} from './Calendar.style';
import { useCalendarStores } from '@/stores/StoreProvider';
import Popover from '@common/components/Popover/Popover';
import { DateTime } from 'luxon';
import { VIEW_MODE } from '@common/constants/common';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toLuxon, diffTime, toDateString } from '@/utils';
import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import { CalendarContext } from '@/common/contexts/CalendarContext';

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

const Calendar: React.FC = observer(() => {
  const { calendarStore, eventStore } = useCalendarStores();
  const calendarRef = useRef<FullCalendar>(null);
  const { userId } = useContext(CalendarContext);
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
  let timer: any;

  const fetchData = async (start: string, end: string) => {
    const eventList = await eventStore.getEventList(userId, start, end);
    calendarStore.setEventList(eventList);
  };

  const renderDayContent = (content: any) => <span>{content.dayNumberText.slice(0, -1)}</span>;

  const renderAllDayContent = ({ text }: { text: string }) =>
    uiStore.viewMode === VIEW_MODE.WEEK ? (
      <AllDayWrapper>
        <AllDayText>{text}</AllDayText>
        <ArrowButton isTop={direction} onClick={handleArrow} />
      </AllDayWrapper>
    ) : (
      text
    );

  const renderMoreLinkContent = (args: MoreLinkContentArg) => `+ ${args.num}`;

  const renderEventContent = ({ event, timeText, backgroundColor }: EventContentArg) => {
    const { startStr, endStr } = event;
    const { minutes } = diffTime(startStr, endStr);
    const isHalfLess = minutes <= 30;

    return (
      <>
        <CalendarColor color={event.extendedProps.dto.calColor} />
        {uiStore.viewMode === VIEW_MODE.MONTH ? (
          <EventWrapper data-color={backgroundColor} data-id={event.id} data-date={endStr} isHalfLess>
            {event.title}
          </EventWrapper>
        ) : (
          <WeekEventWrapper data-color={backgroundColor} isHalfLess={isHalfLess}>
            <EventSpan>{event.title}</EventSpan>
            {minutes >= 60 && <EventSpan>{timeText}</EventSpan>}
          </WeekEventWrapper>
        )}
      </>
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

  const handleEventClick = async ({ event, jsEvent }: EventClickArg) => {
    jsEvent.stopPropagation();
    const eventInfo = await eventStore.getEventInfo(+event.id);
    eventStore.setEvent(eventInfo);
    if (!pathname.includes('detail')) navigate(`/main/detail`);
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

  const handleDoubleClick = ({ dayEl }: DateClickArg) => {
    setDateDay(dayEl);
    if (!pathname.includes('create')) navigate('create');
  };

  const handleRightClick = (e: any) => {
    e.preventDefault(); // 기존 브라우저 우클릭 동작 제어
    const target = e.target?.closest('.fc-daygrid-event') || e.target?.closest('.fc-timegrid-event');
    if (!target) return;

    const { color, id, date } = e.target?.querySelector('span[data-color]')?.dataset;
    uiStore.contextClickArg = {
      target,
      position: { top: e.clientY, left: e.clientX },
      color,
      type: 'event',
      id,
      date,
    };
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
    uiStore.setDateDay(toLuxon(date));
  };

  const getDay = (dayDate: number) => ['일', '월', '화', '수', '목', '금', '토'][dayDate];

  useEffect(() => {
    if (calendarRef) {
      uiStore.mainApi = calendarRef?.current?.getApi();
      uiStore.setDateRange({
        start: toDateString(uiStore.mainApi.view.activeStart),
        view: DateTime.now(),
        end: toDateString(uiStore.mainApi.view.activeEnd),
      });
    }
  }, []);

  useEffect(() => {
    const dispose = autorun(() => {
      const { start, end } = uiStore.dateRange;
      fetchData(start, end);
    });
    return () => dispose();
  }, []);

  useEffect(() => {
    if (viewMode) uiStore.viewMode = viewMode;
    else uiStore.viewMode = VIEW_MODE.MONTH;
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
          events={calendarStore.eventList}
          dayMaxEvents={5}
          moreLinkContent={renderMoreLinkContent}
          allDayContent={renderAllDayContent}
          moreLinkClick={renderMoreClick}
          dateClick={handleClick}
          eventContent={renderEventContent}
          nowIndicator
        />
        <Popover moreLinkData={moreLinkData} setMoreLinkData={setMoreLinkData} />
      </FullCalendarWrapper>
    </CalendarContainer>
  );
});

export default Calendar;
