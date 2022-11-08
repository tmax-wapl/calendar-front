import { Icon } from '@wapl/ui';
import { Wrapper, ItemTitleWrapper, EventTitle, EventDate, CalendarName } from './EventItem.style';

interface Event {
  color: string;
  importance: boolean;
  title: string;
  date: string;
  calendarName: string;
}

interface Props {
  event: Event;
}

const EventItem = ({ event }: Props) => {
  return (
    <Wrapper>
      <ItemTitleWrapper>
        <Icon.CalendarDotFill color={event.color} width={20} height={20} />
        {event.importance && <Icon.BookmarkFill color="#fcbb00" width={16} height={16} />}
        <EventTitle>{event.title}</EventTitle>
      </ItemTitleWrapper>
      <EventDate>{event.date}</EventDate>
      <CalendarName>{event.calendarName}</CalendarName>
    </Wrapper>
  );
};

EventItem.defaultProps = {
  event: {
    color: '#FF46B5',
    importance: true,
    title: '일정 제목',
    date: '오전 9:00 ~ 오전 9:30, 1주 간격, 월 화 수 목 금 토 일 반복',
    calendarName: '캐릭터A의 캘린더',
  },
};

export default EventItem;
