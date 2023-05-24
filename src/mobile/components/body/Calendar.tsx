import FullCalendar, {
  DayCellContentArg,
  DayHeaderContentArg,
  EventContentArg,
  MoreLinkContentArg,
} from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { CalendarContainer, EventWrapper, FullCalendarWrapper, EventTitle } from './Calendar.style';
import { useEffect, useRef } from 'react';
import { useCalendarStores } from '@/stores/StoreProvider';
import { useSwipeable, LEFT, RIGHT, SwipeEventData } from 'react-swipeable';
import { DateHandleType } from '@/web/components';
import { Observer, observer } from 'mobx-react-lite';
import { getStartDate, toDateString, toDateTime, toISO } from '@/utils';
import { VIEW_MODE } from '@/common';
import { autorun, transaction } from 'mobx';
import { useParams } from 'react-router-dom';
import { DateTime } from 'luxon';
import { EventModel } from '@/stores';

type SwipeType = typeof LEFT | typeof RIGHT;

const Calendar = observer(() => {
  const { uiStore, eventStore, calendarStore } = useCalendarStores();
  const calendarRef = useRef(null);
  const { viewMode } = useParams();

  const fetchData = async (start: string, end: string) => {
    const { eventList, holidayList } = await eventStore.getEventList(start, end);

    transaction(() => {
      calendarStore.setEventList(eventList);
      calendarStore.setHolidayList(holidayList);
    });
  };

  const fetchEvent = async () => {
    if (!uiStore.notiData?.eventId) return;
    const event = uiStore.mainApi.getEventById(`${uiStore.notiData.eventId}`);
    if (!event) return;
    const eventInfo = await eventStore.getEventInfo(+event.id, event.startStr, event.extendedProps.dto.roomId);
    uiStore.setDateDay(eventInfo.startDate.startOf('day'));
    eventStore.setEvent(eventInfo);
    uiStore.setPageDialogInfo('detail');
    uiStore.setNotiData(null);
  };

  const renderMoreLinkContent = (args: MoreLinkContentArg) => `+ ${args.num}`;

  const renderEventContent = ({ event }: EventContentArg) => {
    return (
      <EventWrapper isHalfLess>
        <EventTitle isHalfLess>{event.title}</EventTitle>
      </EventWrapper>
    );
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

  const renderDayContent = (content: DayCellContentArg) => (
    <Observer>
      {() => (
        <span style={{ color: uiStore.isHolidayChecked ? DateColor(content) : '' }}>
          {content.dayNumberText ? content.dayNumberText.slice(0, -1) : content.date.getDate()}
        </span>
      )}
    </Observer>
  );

  const renderHeaderContent = (content: DayHeaderContentArg) => {
    const reg = /\((.*?)\)/;
    const match = reg.exec(content.text);
    return match ? match[1] : content.text;
  };

  const handleSwipe = (eventData: SwipeEventData) => {
    const { dir } = eventData;
    const mainApi = uiStore.getApi();
    const type = {
      Left: 'next',
      Right: 'prev',
    };
    calendarStore.setEventList([]); // re-paint
    mainApi?.[type[dir as SwipeType] as DateHandleType]();
    uiStore.changeDateRange();
  };
  const wrapperRef = useRef<HTMLDivElement>();

  const swipeRef = (el: HTMLDivElement) => {
    swipeHandlers.ref(el);
    wrapperRef.current = el;
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleSwipe,
    onSwipedRight: handleSwipe,
  });

  const setDateTime = (start: Date) => {
    const startDate = getStartDate(toDateTime(start));
    eventStore.event.startDate = startDate;
    eventStore.event.endDate = startDate.plus({ minutes: 30 });
  };

  const handleDateClick = ({ date }: DateClickArg) => {
    uiStore.setDateDay(toDateTime(date));
    setDateTime(date);
  };

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
    }
  }, []);

  useEffect(() => {
    const dispose = autorun(() => {
      uiStore.mainApi?.select(toISO(uiStore.dateDay));
    });
    return () => dispose();
  }, []);

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
    if (!uiStore.notiData?.start) return;
    uiStore.mainApi?.gotoDate(uiStore.notiData.start);
    uiStore.changeDateRange();
  }, [uiStore.notiData]);

  return (
    <CalendarContainer>
      <FullCalendarWrapper {...swipeHandlers} ref={swipeRef}>
        <FullCalendar
          locale="ko"
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          allDayText="종일"
          events={
            uiStore.viewMode === VIEW_MODE.MONTH
              ? calendarStore.eventList.filter(event => event.importance || !uiStore.isImportanceChecked)
              : calendarStore.eventList
                  .filter(event => event.importance || !uiStore.isImportanceChecked)
                  .map(event => createAllDayEvent(event))
          }
          moreLinkContent={renderMoreLinkContent}
          dayHeaderContent={renderHeaderContent}
          dayCellContent={renderDayContent}
          eventContent={renderEventContent}
          dateClick={handleDateClick}
          unselectAuto={false}
          dayMaxEvents={4}
          nowIndicator
          eventOrder="-allDay,start,-duration,-regDate"
          editable
        />
      </FullCalendarWrapper>
    </CalendarContainer>
  );
});

export default Calendar;
