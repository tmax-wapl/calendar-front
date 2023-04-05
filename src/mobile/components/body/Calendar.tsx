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
} from '@common/styles/Calendar.style';

const Calendar = () => {
  const renderDayContent = (content: DayCellContentArg) => <span>{content.dayNumberText.slice(0, -1)}</span>;
  return (
    <CalendarContainer>
      <FullCalendarWrapper>
        <FullCalendar
          locale="ko"
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
