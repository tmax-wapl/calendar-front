import React, { useContext, useEffect, useRef, useState } from 'react';
import FullCalendar, {
  DayCellContentArg,
  DayHeaderContentArg,
  EventApi,
  EventClickArg,
  EventContentArg,
  EventDropArg,
  EventMountArg,
  EventSegment,
  MoreLinkArg,
  MoreLinkContentArg,
  VUIEvent,
} from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { Icon } from '@wapl/ui';
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
  WeekDayHeader,
} from './Calendar.style';
import { useCalendarStores } from '@/stores/StoreProvider';
import Popover from '@common/components/Popover/Popover';
import { DateTime } from 'luxon';
import { EVENT_UPDATE_OPTION, VIEW_MODE } from '@common/constants/common';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toLuxon, diffTime, toDateString, toISO } from '@/utils';
import { autorun, transaction } from 'mobx';
import { Observer, observer } from 'mobx-react-lite';
import { CalendarContext } from '@/common/contexts/CalendarContext';
import { Holiday, Lunar } from '../EventListView.style';
import { getLunar } from 'holiday-kr';
import { EventModel } from '@/stores/model/EventModel';

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

  const fetchData = async (start: string, end: string) => {
    const { eventList, holidayList } = await eventStore.getEventList(userId, start, end);

    transaction(() => {
      calendarStore.setEventList(eventList);
      calendarStore.setHolidayList(holidayList);
    });
  };

  const isHoliday = (date: string) => {
    return !!calendarStore.holidayList.find(item => item.dateDay === date && item.isRed);
  };

  const DateColor = (content: DayCellContentArg | DayHeaderContentArg, isWeekDay = false) => {
    const date = toDateString(content.date);
    if (content.dow === 0 || isHoliday(date)) return 'red'; // 공휴일
    else if (date === DateTime.local().toFormat('yyyy-LL-dd') && !isWeekDay) return 'white'; // today
    return 'black'; // 일반 date
  };

  const renderDayContent = (content: DayCellContentArg) => (
    <span style={{ color: DateColor(content) }}>{content.dayNumberText.slice(0, -1)}</span>
  );

  const renderAllDayContent = ({ text }: { text: string }) =>
    uiStore.viewMode === VIEW_MODE.WEEK ? (
      <AllDayWrapper>
        <AllDayText>{text}</AllDayText>
        <ArrowButton isTop={direction} onClick={handleArrow} />
      </AllDayWrapper>
    ) : (
      text
    );

  const lunar = (date: Date) => {
    const { month, day } = getLunar(date);
    return `음 ${month}.${day}.`;
  };

  const holiday = (content: DayHeaderContentArg) => {
    const date = toDateString(content.date);
    const holiday = calendarStore.holidayList.find(item => item.dateDay === date && item.isRed);
    return holiday && <Holiday isRed={holiday.isRed}>{holiday.name}</Holiday>;
  };

  const renderHeaderContent = (content: DayHeaderContentArg) => {
    return uiStore.viewMode === VIEW_MODE.WEEK ? (
      <Observer>
        {() => (
          <WeekDayHeader color={DateColor(content, true)}>
            {content.date.getDate()} {getDay(content.dow)}
            {uiStore.isHolidayChecked && holiday(content)}
            {uiStore.isLunarChecked && (
              <Lunar isRed={isHoliday(toDateString(content.date))}>{lunar(content.date)}</Lunar>
            )}
          </WeekDayHeader>
        )}
      </Observer>
    ) : (
      content.text
    );
  };

  const renderMoreLinkContent = (args: MoreLinkContentArg) => `+ ${args.num}`;

  const renderEventContent = ({ event, timeText }: EventContentArg) => {
    const { startStr, endStr } = event;
    const { minutes } = diffTime(startStr, endStr);
    const isHalfLess = minutes <= 30;

    return (
      <>
        <CalendarColor color={event.extendedProps.dto.calColor} />
        {uiStore.viewMode === VIEW_MODE.MONTH ? (
          <EventWrapper isHalfLess>
            {event.extendedProps.dto.importance && (
              <Icon.BookmarkFill
                className="mr-2"
                width={12}
                height={12}
                color="#FCBB00"
                {...{ style: { minWidth: '12px' } }}
              />
            )}
            {event.title}
          </EventWrapper>
        ) : (
          <WeekEventWrapper isHalfLess={isHalfLess}>
            <EventSpan>
              {event.extendedProps.dto.importance && (
                <Icon.BookmarkFill
                  className="mr-2"
                  width={12}
                  height={12}
                  color="#FCBB00"
                  {...{ style: { minWidth: '12px' } }}
                />
              )}
              {event.title}
            </EventSpan>
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
    const eventInfo = await eventStore.getEventInfo(+event.id, event.startStr);
    uiStore.setDateDay(eventInfo.startDate.startOf('day'));
    eventStore.setEvent(eventInfo);
    if (!pathname.includes('detail')) navigate(`/main/view-mode/${uiStore.viewMode}/detail`);
  };

  const handleClick = (dateInfo: DateClickArg) => {
    dateInfo.jsEvent.stopPropagation();
    if (dateInfo.jsEvent.detail === 1) handleDateClick(dateInfo);
    if (dateInfo.jsEvent.detail % 2 === 0) handleDoubleClick(dateInfo);
  };

  const handleDateClick = (dateInfo: DateClickArg) => {
    const { viewMode } = uiStore;
    viewMode === VIEW_MODE.MONTH ? handleMonthViewClick(dateInfo) : handleDateTimeSelect(dateInfo);
  };

  const handleDoubleClick = ({ dayEl }: DateClickArg) => {
    setDateDay(dayEl);
    if (!pathname.includes('create')) navigate(`/main/view-mode/${uiStore.viewMode}/create`);
  };

  const handleMonthViewClick = ({ dayEl }: DateClickArg) => {
    setDateDay(dayEl);
    if (!pathname.includes('date')) navigate(`view-mode/${uiStore.viewMode}/date`);
  };

  const handleDateTimeSelect = ({ dayEl, jsEvent }: DateClickArg) => {
    if (!(jsEvent.target instanceof HTMLElement)) return;
    const { time } = jsEvent.target.dataset;
    setDateDay(dayEl);
    if (!pathname.includes('date')) navigate(`view-mode/${uiStore.viewMode}/date`);
    console.log(time);
    console.log(dayEl, jsEvent);
  };

  const handleDidMount = (arg: EventMountArg) => {
    // 이벤트 렌더 후처리, 현재는 ContextMenu만 제어.
    const target = arg.el;
    const { id, backgroundColor: color, startStr: startdate, endStr: enddate, extendedProps } = arg.event;
    const type = extendedProps.dto.rrule ? 'repeatEvent' : 'event';

    target.addEventListener('contextmenu', (e: MouseEvent) => {
      e.preventDefault();
      if (extendedProps.dto.subEvent) return;
      uiStore.setContextClickArg({
        target,
        position: { top: e.clientY, left: e.clientX },
        color,
        type,
        id: +id,
        date: {
          startdate,
          enddate,
        },
      });
    });
  };

  const handleDragEnd = (args: EventDropArg) => {
    const { event, revert } = args;
    const {
      extendedProps: {
        dto: { rrule, subEvent },
      },
    } = event;
    if (subEvent) {
      revert(); // 외부 일정인 경우 드롭 안되게
      return;
    }
    if (rrule) {
      // TODO: 반복일정
      return;
    }
    updateEvent(event); // 일반일정
  };

  const updateEvent = async (event: EventApi) => {
    const { id } = event;
    const target = await eventStore.updateEvent(
      +id,
      new EventModel({
        ...event.extendedProps.dto,
        start: toISO(DateTime.fromJSDate(event.start).toUTC()),
        end: toISO(DateTime.fromJSDate(event.end).toUTC()),
      }),
      EVENT_UPDATE_OPTION.DEFAULT,
    );
    calendarStore.updateEventList(target);
    navigate(`/main/view-mode/${uiStore.viewMode}/detail`);
  };

  const setDateDay = (dayEl: HTMLElement) => {
    const { date } = dayEl.dataset;
    uiStore.setDateDay(toLuxon(date));
  };

  const getDay = (dayDate: number) => ['일', '월', '화', '수', '목', '금', '토'][dayDate];

  const createAllDayEvent = (event: EventModel) => {
    const { startDate, endDate } = event;
    const newEvent = new EventModel({ ...event.dto });
    const is24Hours = endDate.diff(startDate, 'hours').toObject().hours >= 24;
    newEvent.allDay = is24Hours;
    newEvent.endDate =
      is24Hours && endDate.startOf('day') < endDate ? endDate.startOf('day').plus({ days: 1 }) : endDate;
    return newEvent;
  };

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
      <FullCalendarWrapper>
        <FullCalendar
          locale="ko"
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={viewMode}
          dayCellContent={renderDayContent}
          eventClick={handleEventClick}
          allDayText="종일"
          events={
            uiStore.viewMode === VIEW_MODE.MONTH
              ? calendarStore.eventList.filter(event => event.importance || !uiStore.isImportanceChecked)
              : calendarStore.eventList
                  .filter(event => event.importance || !uiStore.isImportanceChecked)
                  .map(event => createAllDayEvent(event))
          }
          dayMaxEvents={5}
          moreLinkContent={renderMoreLinkContent}
          allDayContent={renderAllDayContent}
          moreLinkClick={renderMoreClick}
          dayHeaderContent={renderHeaderContent}
          dateClick={handleClick}
          eventContent={renderEventContent}
          nowIndicator
          eventOrder="-allDay,start,-duration,-regDate"
          eventDidMount={handleDidMount}
          eventDrop={handleDragEnd}
          editable
        />
        <Popover moreLinkData={moreLinkData} setMoreLinkData={setMoreLinkData} />
      </FullCalendarWrapper>
    </CalendarContainer>
  );
});

export default Calendar;
