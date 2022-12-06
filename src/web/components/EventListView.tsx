import { EventDTO } from '@common/constants/interfaces';
import { EventListViewContainer, DateInfo, DateDay, Holiday, Lunar } from './EventListView.style';
import EventItem from './EventItem';
import NoResult from './NoResult';

const EventListView = () => {
  const eventList: EventDTO[] = [
    {
      color: '#FF46B5',
      importance: true,
      title: '일정 제목',
      allDay: false,
      start: '2021-09-03T09:00:00',
      end: '2021-09-03T09:30:00',
      time: '오전 9:00 ~ 오전 9:30',
      repeat: '1주 간격, 월 화 수 목 금 토 일 반복',
      calendarName: '캐릭터A의 캘린더',
    },
    {
      color: '#3384FF',
      importance: false,
      title: '일정 제목',
      allDay: false,
      start: '2021-09-03T09:00:00',
      end: '2021-09-03T09:30:00',
      time: '오전 9:00 ~ 오전 9:30',
      calendarName: '캐릭터A의 캘린더',
    },
  ]; // TODO: store 변수로 대체

  return (
    <EventListViewContainer>
      <DateInfo>
        <DateDay>9월 20일 월요일</DateDay>
        <Holiday>추석 연휴</Holiday>
        <Lunar>음력 8.14.</Lunar>
      </DateInfo>
      {eventList.length > 0 ? eventList.map((event, index) => <EventItem key={index} event={event} />) : <NoResult />}
    </EventListViewContainer>
  );
};

export default EventListView;
