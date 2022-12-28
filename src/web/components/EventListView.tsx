import { EventDTO } from '@common/constants/interfaces';
import { EventListViewContainer, DateInfo, DateDay, Holiday, Lunar } from './EventListView.style';
import EventItem from './EventItem';
import NoResult from './NoResult';
import { useCalendarStores } from '@/stores/StoreProvider';
import { Observer } from 'mobx-react-lite';

const EventListView = () => {
  const { uiStore } = useCalendarStores();
  const eventList: EventDTO[] = [
    {
      id: 0,
      calId: 0,
      color: '#FF46B5',
      importance: true,
      name: '일정 제목',
      allDay: false,
      startDate: '2021-09-03T09:00:00',
      endDate: '2021-09-03T09:30:00',
      calendarName: '캐릭터A의 캘린더',
    },
    {
      id: 1,
      calId: 0,
      color: '#3384FF',
      importance: false,
      name: '일정 제목',
      allDay: false,
      startDate: '2021-09-03T09:00:00',
      endDate: '2021-09-03T09:30:00',
      calendarName: '캐릭터A의 캘린더',
    },
  ]; // TODO: store 변수로 대체

  const getDateDay = (): string => {
    const { dateDay } = uiStore;
    return dateDay.toFormat('MM월 dd일 ') + ['', '월', '화', '수', '목', '금', '토', '일'][dateDay.weekday] + '요일';
  };

  return (
    <EventListViewContainer>
      <DateInfo>
        <Observer>
          {() => {
            return (
              <>
                <DateDay>{getDateDay()}</DateDay>
                <Holiday>추석 연휴</Holiday>
                <Lunar>음력 8.14.</Lunar>
              </>
            );
          }}
        </Observer>
      </DateInfo>
      {eventList.length > 0 ? eventList.map((event, index) => <EventItem key={index} event={event} />) : <NoResult />}
    </EventListViewContainer>
  );
};

export default EventListView;
