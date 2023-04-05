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
import { MutableRefObject, useEffect, useRef } from 'react';
import { useCalendarStores } from '@/stores/StoreProvider';
import { useSwipeable, LEFT, RIGHT, SwipeEventData } from 'react-swipeable';
import { DateHandleType } from '@/web/components';

type SwipeType = typeof LEFT | typeof RIGHT;

const Calendar = () => {
  const { uiStore } = useCalendarStores();
  const calendarRef = useRef(null);
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

  useEffect(() => {
    if (calendarRef) {
      uiStore.mainApi = calendarRef?.current?.getApi();
    }
  }, []);

  return (
    <CalendarContainer>
      <FullCalendarWrapper {...swipeHandlers} ref={swipeRef}>
        <FullCalendar
          locale="ko"
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          allDayText="종일"
          events={[]}
          dayCellContent={renderDayContent}
          dayMaxEvents={5}
          nowIndicator
          eventOrder="-allDay,start,-duration,-regDate"
          editable
          selectable
        />
      </FullCalendarWrapper>
    </CalendarContainer>
  );
};

export default Calendar;
