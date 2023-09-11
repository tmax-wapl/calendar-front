import React, { useEffect, useRef, useState } from 'react';
import FullCalendar, {
  DateSelectArg,
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
import interactionPlugin from '@fullcalendar/interaction';
import { Icon, useWaplUiStore } from '@wapl/ui';
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
  EventTitle,
  Today,
  DayNum,
  DayNumWrapper,
  Holiday,
  Lunar,
} from './Calendar.style';
import { useCalendarStores } from '@/stores/StoreProvider';
import Popover from '@common/components/Popover/Popover';
import { DateTime } from 'luxon';
import { EVENT_UPDATE_OPTION, VIEW_MODE } from '@common/constants/common';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { diffTime, toDateString, toISO, toDateTime, toUTC, toLuxon } from '@/utils';
import { autorun, transaction } from 'mobx';
import { Observer, observer } from 'mobx-react-lite';
import { getLunar } from 'holiday-kr';
import { EventModel } from '@/stores/model/EventModel';
import { RRule, Weekday } from 'rrule';

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

interface ContextMenuEventTarget extends EventTarget {
  getBoundingClientRect(): DOMRect;
}

interface DragElement {
  oldEvent: EventApi | null;
  newEvent: EventApi | null;
}

const Calendar = observer(({ isEventUpdating }: { isEventUpdating: boolean }) => {
  const { calendarStore, eventStore } = useCalendarStores();
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
  let dragEL: DragElement = {
    oldEvent: null,
    newEvent: null,
  };
  const {
    toast: { notify },
  } = useWaplUiStore();

  const fetchData = async (start: string, end: string) => {
    const { eventList, holidayList } = await eventStore.getEventList(start, end);

    transaction(() => {
      calendarStore.setEventList(eventList);
      calendarStore.setHolidayList(holidayList);
    });
  };

  const fetchEvent = async () => {
    if (!uiStore.notiData?.eventId || !uiStore.notiData.start) return;
    const eventInfo = await eventStore.getEventInfo(
      uiStore.notiData.eventId,
      uiStore.notiData.start,
      uiStore.notiData.roomId,
    );
    if (!eventInfo) return;
    eventStore.setEvent(eventInfo);
    uiStore.setNotiData(null);
    goRoute('detail');
  };

  const isHoliday = (date: string) => {
    return !!calendarStore.holidayList.find(item => item.dateDay === date && item.isRed);
  };

  const DateColor = (content: DayCellContentArg | DayHeaderContentArg, isWeekDay = false) => {
    const date = toDateString(content.date);
    if (content.dow === 0 || (isHoliday(date) && uiStore.isHolidayChecked)) return 'red'; // 공휴일
    else if (date === DateTime.local().toFormat('yyyy-LL-dd') && !isWeekDay) return 'white'; // today
    return 'black'; // 일반 date
  };

  const renderDayContent = (content: DayCellContentArg) => {
    const isOtherMonth = content.view.currentStart.getMonth() !== content.date.getMonth();
    const isToday = toDateString(content.date) === DateTime.local().toFormat('yyyy-LL-dd');
    const isMonth = uiStore.viewMode === VIEW_MODE.MONTH;

    return (
      <Observer>
        {() =>
          isMonth && (
            <div style={{ display: 'flex' }}>
              <DayNumWrapper isToday={isToday} color={DateColor(content)} opacity={isOtherMonth ? 0.3 : 1}>
                <span className={`${isToday ? 'fc-today' : ''}`}>
                  <DayNum isToday={isToday}>{content.dayNumberText.slice(0, -1)}</DayNum>
                </span>
                {uiStore.isHolidayChecked && holiday(content, isMonth)}
                {uiStore.isLunarChecked && (
                  <Lunar isRed={isHoliday(toDateString(content.date)) && uiStore.isHolidayChecked}>
                    {lunar(content.date)}
                  </Lunar>
                )}
              </DayNumWrapper>
            </div>
          )
        }
      </Observer>
    );
  };

  const renderAllDayContent = ({ text }: { text: string }) =>
    uiStore.viewMode === VIEW_MODE.WEEK ? (
      <AllDayWrapper>
        <AllDayText>{text}</AllDayText>
        <ArrowButton isTop={direction} onClick={handleArrow} />
      </AllDayWrapper>
    ) : (
      text
    );

  const date = (content: DayHeaderContentArg) => {
    const isToday = toDateString(content.date) === DateTime.local().toFormat('yyyy-LL-dd');
    const dateNum = content.date.getDate();

    return isToday ? <Today>{dateNum}</Today> : <span style={{ marginRight: '4px' }}>{dateNum}</span>;
  };

  const lunar = (date: Date) => {
    const { month, day } = getLunar(date);
    return `음 ${month}.${day}.`;
  };

  const holiday = (content: DayHeaderContentArg | DayCellContentArg, isMonth = true) => {
    const date = toDateString(content.date);
    const holiday = calendarStore.holidayList.find(item => item.dateDay === date && item.isRed);
    return (
      holiday && (
        <Holiday isRed={holiday.isRed} style={{ marginLeft: isMonth ? '12px' : '10px' }}>
          {holiday.name}
        </Holiday>
      )
    );
  };

  const renderHeaderContent = (content: DayHeaderContentArg) => {
    return uiStore.viewMode === VIEW_MODE.WEEK ? (
      <Observer>
        {() => (
          <WeekDayHeader color={DateColor(content, true)}>
            {date(content)}
            {getDay(content.dow)}
            {uiStore.isHolidayChecked && holiday(content, false)}
            {uiStore.isLunarChecked && (
              <Lunar isRed={isHoliday(toDateString(content.date)) && uiStore.isHolidayChecked}>
                {lunar(content.date)}
              </Lunar>
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
            {event.extendedProps.dto.importance && <BookMarkIcon className="mr-2" />}
            <EventTitle isHalfLess>{event.title}</EventTitle>
          </EventWrapper>
        ) : (
          <WeekEventWrapper isHalfLess={isHalfLess}>
            <EventSpan>
              {event.extendedProps.dto.importance && <BookMarkIcon className="mr-2 mt-2" />}
              <EventTitle isHalfLess={isHalfLess}>{event.title}</EventTitle>
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

  const BookMarkIcon = React.memo(({ className }: { className: string }) => {
    return (
      <Icon.BookmarkFill
        className={className}
        width={12}
        height={12}
        color="#FCBB00"
        {...{ style: { minWidth: '12px' } }}
      />
    );
  });

  const handleArrow = () => {
    const mainApi = uiStore.getApi();
    direction ? mainApi.setOption('dayMaxEvents', 3) : mainApi.setOption('dayMaxEvents', false);
    setDirection(!direction);
  };

  const handleEventClick = async ({ event, jsEvent }: Partial<EventClickArg>) => {
    jsEvent?.stopPropagation();
    const eventInfo = await eventStore.getEventInfo(+event.id, event.startStr, event.extendedProps.dto.roomId);
    uiStore.setDateDay(eventInfo.startDate.startOf('day'));
    eventStore.setEvent(eventInfo);
    goRoute('detail');
  };

  const handleDoubleClick = (event: any) => {
    event.stopPropagation();
    goRoute('create');
  };

  const handleDateTimeSelect = ({ start, end, jsEvent, startStr, endStr }: DateSelectArg) => {
    if (!jsEvent) return;
    jsEvent.stopPropagation();
    if (isEventUpdating) return;
    if (uiStore.viewMode === VIEW_MODE.WEEK) {
      const { minutes } = diffTime(startStr, endStr);
      if (minutes > 30) {
        goRoute('create');
        setDateTime(start, end);
        return;
      }
    }

    if (!pathname.includes('create')) uiStore.setDateDay(toDateTime(start));
    setDateTime(start, end);

    if (pathname.includes('create')) return;
    goRoute('date');
  };

  const goRoute = (routePath: string) => {
    if (!pathname.includes(routePath)) navigate(`view-mode/${uiStore.viewMode}/${routePath}`);
  };

  const handleDidMount = (arg: EventMountArg) => {
    // 이벤트 렌더 후처리, 현재는 ContextMenu만 제어.
    const target = arg.el;
    const { id, backgroundColor: color, startStr: startdate, endStr: enddate, extendedProps } = arg.event;
    const type = extendedProps.dto.shareEvent ? 'shareEvent' : extendedProps.dto.rrule ? 'repeatEvent' : 'event';

    target.addEventListener('contextmenu', (e: MouseEvent) => {
      const el = e.target as ContextMenuEventTarget;
      const domRect: DOMRect = el.getBoundingClientRect();

      e.preventDefault();
      if (extendedProps.dto.subEvent || extendedProps.dto.roomId) return;
      uiStore.setContextClickArg({
        target,
        position: { top: domRect.top, left: domRect.right + 3 },
        color,
        type,
        hideColorPicker: extendedProps.dto.shareEvent,
        id: +id,
        date: {
          startdate,
          enddate,
        },
      });
    });
  };

  const handleDragEnd = (args: EventDropArg) => {
    const { event, revert, oldEvent } = args;
    const {
      extendedProps: {
        dto: { rrule, subEvent, shareEvent },
      },
    } = event;
    if (subEvent || shareEvent) {
      notify('공유 받은 일정은 수정할 수 없습니다.');
      revert(); // 외부 일정 및 공유 받은 일정인 경우 드롭 안되게
      return;
    }

    if (rrule) {
      dragEL = {
        oldEvent,
        newEvent: event,
      };
      uiStore.setDialogInfo({
        action: 'repeatEventUpdate',
        onClick: [
          (): void => {
            uiStore.setDialogInfo(null);
            // drag 요소 초기화.
            dragEL = null;
          },
          updateRepeatEvent,
        ],
        data: { selectType: 'hideAll' },
        type: 'select',
      });
      revert();
      return;
    }
    updateEvent(event); // 일반일정
  };

  const updateEvent = async (event: EventApi) => {
    const { id } = event;
    await eventStore.updateEvent(
      +id,
      new EventModel({
        ...event.extendedProps.dto,
        start: toISO(DateTime.fromJSDate(event.start).toUTC()),
        end: toISO(DateTime.fromJSDate(event.end).toUTC()),
      }),
      EVENT_UPDATE_OPTION.DEFAULT,
    );
    uiStore.changeDateRange();
    navigate(`/main/view-mode/${uiStore.viewMode}/detail`);
  };

  const updateRepeatEvent = async (value: string) => {
    const {
      oldEvent: { id, start },
      newEvent: {
        extendedProps: { dto },
        start: newStart,
        end: newEnd,
      },
    } = dragEL;

    switch (value) {
      case 'one': // 이 일정만 수정
        await eventStore.updateEvent(
          +id,
          new EventModel({
            ...dto,
            id: null,
            start: toUTC(newStart),
            end: toUTC(newEnd),
          }),
          EVENT_UPDATE_OPTION.ONCE_REPEAT_EVENT,
          toDateTime(start).toUTC().toFormat('yyyy-LL-dd'),
        );
        uiStore.setDateDay(toDateTime(newStart));
        break;
      case 'after': // 이 일정 및 향후 일정 수정
        await eventStore.updateEvent(
          +id,
          new EventModel({
            ...dto,
            id: null,
            rrule: applyDropRRule().toString(),
            start: toUTC(newStart),
            end: toUTC(newEnd),
            repeatStartDate: toISO(
              dragEL.oldEvent.allDay ? toDateTime(start).startOf('day').toUTC() : toDateTime(start).toUTC(),
            ),
          }),
          EVENT_UPDATE_OPTION.AFTER_REPEAT_EVENT,
          toDateTime(start).toUTC().toFormat('yyyy-LL-dd'),
        );
        uiStore.setDateDay(toDateTime(newStart));
        break;
      default:
        break;
    }
    dragEL = null;
    uiStore.setDialogInfo(null);
    uiStore.changeDateRange();
  };

  const applyDropRRule = (): RRule => {
    const { oldEvent, newEvent } = dragEL;
    const originRRule = new EventModel(oldEvent.extendedProps.dto).rrule;

    const originWeekDay = originRRule.byweekday as Weekday[];
    const newWeekDay = toDateTime(newEvent.start).weekday - 1;

    const dayOffset = newWeekDay - originWeekDay[0].weekday;
    const utcOffset = toDateTime(newEvent.start).toUTC().weekday - toDateTime(newEvent.start).weekday;
    const weekdayOffset = dayOffset + utcOffset;

    const byweekday = (originWeekDay as Weekday[]).map(({ weekday }) => (weekday + weekdayOffset + 7) % 7);
    const rrule = new RRule({ ...originRRule, byweekday, dtstart: newEvent.start });

    return rrule;
  };

  const setDateTime = (start: Date, end: Date) => {
    const isKeepTime = uiStore.viewMode === VIEW_MODE.MONTH && pathname.includes('create');

    const startDate = toDateTime(start);
    const endDate = toDateTime(end);

    eventStore.event.startDate = isKeepTime
      ? startDate.set({ hour: eventStore.event.startDate.hour, minute: eventStore.event.startDate.minute })
      : startDate;
    eventStore.event.endDate = isKeepTime
      ? endDate.plus({ days: -1 }).set({ hour: eventStore.event.endDate.hour, minute: eventStore.event.endDate.minute })
      : endDate;
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
    const dispose = autorun(async () => {
      const { start, end } = uiStore.dateRange;
      await fetchData(start, end);
      fetchEvent();
    });
    return () => dispose();
  }, []);

  useEffect(() => {
    if (viewMode) uiStore.viewMode = viewMode;
    else uiStore.viewMode = VIEW_MODE.MONTH;
  }, [viewMode]);

  useEffect(() => {
    const target = document.querySelectorAll('table.fc-scrollgrid-sync-table tbody .fc-daygrid-day-number');
    document.querySelectorAll('.fc-day-other').forEach(el => el.classList.remove('fc-day-other')); // 더블클릭 이벤트 제어 클래스 제거
    document.querySelector('.fc-daygrid-day.fc-day-today')?.classList.remove('fc-day-today');

    if (target) Array.from(target).map(el => el.addEventListener('dblclick', handleDoubleClick));
    return () => {
      if (target) Array.from(target).map(el => el.removeEventListener('dblclick', handleDoubleClick));
    };
  });

  useEffect(() => {
    if (!uiStore.notiData?.start) return;
    uiStore.mainApi?.gotoDate(uiStore.notiData.start);
    uiStore.changeDateRange();
    uiStore.setDateDay(toLuxon(uiStore.notiData.start));
    if (uiStore.notiData.eventId) return;
    goRoute('date');
  }, [uiStore.notiData]);

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
          select={handleDateTimeSelect}
          eventContent={renderEventContent}
          nowIndicator
          eventOrder="-allDay,start,-duration,-regDate"
          eventDidMount={handleDidMount}
          eventDrop={handleDragEnd}
          editable
          selectable
        />
        <Popover moreLinkData={moreLinkData} setMoreLinkData={setMoreLinkData} />
      </FullCalendarWrapper>
    </CalendarContainer>
  );
});

export default Calendar;
