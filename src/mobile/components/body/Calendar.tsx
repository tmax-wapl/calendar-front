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
  ViewApi,
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
  WeekDayHeader,
  EventTitle,
  Today,
} from './Calendar.style';
import { useEffect, useRef } from 'react';
import { useCalendarStores } from '@/stores/StoreProvider';
import { useSwipeable, LEFT, RIGHT, SwipeEventData } from 'react-swipeable';
import { CalendarEventDummy, DateHandleType } from '@/web/components';
import { observer } from 'mobx-react-lite';
import { toDateTime, toISO } from '@/utils';
import { VIEW_MODE } from '@/common';
import { autorun } from 'mobx';

type SwipeType = typeof LEFT | typeof RIGHT;

const Calendar = observer(() => {
  const { uiStore } = useCalendarStores();
  const calendarRef = useRef(null);

  const renderMoreLinkContent = (args: MoreLinkContentArg) => `+ ${args.num}`;

  const renderEventContent = ({ event }: EventContentArg) => {
    return (
      <EventWrapper isHalfLess>
        <EventTitle isHalfLess>{event.title}</EventTitle>
      </EventWrapper>
    );
  };

  const renderDayContent = (content: DayCellContentArg) => <span>{content.dayNumberText.slice(0, -1)}</span>;

  const handleSwipe = (eventData: SwipeEventData) => {
    const { dir } = eventData;
    const mainApi = uiStore.getApi();
    const type = {
      Left: 'next',
      Right: 'prev',
    };
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

  const handleDateClick = ({ date }: DateClickArg) => {
    uiStore.setDateDay(toDateTime(date));
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

  return (
    <CalendarContainer isViewRow={uiStore.isViewRow} rowNum={uiStore.rowNum}>
      <FullCalendarWrapper {...swipeHandlers} ref={swipeRef}>
        <FullCalendar
          locale="ko"
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          allDayText="종일"
          events={CalendarEventDummy}
          moreLinkContent={renderMoreLinkContent}
          dayCellContent={renderDayContent}
          eventContent={renderEventContent}
          dateClick={handleDateClick}
          dayMaxEvents={4}
          nowIndicator
          eventOrder="-allDay,start,-duration,-regDate"
          editable
          selectable
        />
      </FullCalendarWrapper>
    </CalendarContainer>
  );
});

export default Calendar;
