import { EventDTO } from '@common/constants/interfaces';
import { EventModel } from '@/stores/model/EventModel';
import { EventListViewContainer, DateInfo, DateDay, Holiday, Lunar } from './EventListView.style';
import EventItem from './EventItem';
import NoResult from './NoResult';
import { useCalendarStores } from '@/stores/StoreProvider';
import { Observer } from 'mobx-react-lite';

const EventListView = () => {
  const { uiStore } = useCalendarStores();
  const eventList: EventModel[] = [
    {
      id: 0,
      calId: 0,
      calName: '캐릭터A의 캘린더',
      color: '#FF46B5',
      importance: true,
      title: '일정 제목',
      allDay: false,
      start: '2021-09-03T09:00:00',
      end: '2021-09-03T09:30:00',
    },
    {
      id: 1,
      calId: 0,
      calName: '캐릭터A의 캘린더',
      color: '#3384FF',
      importance: false,
      title: '일정 제목',
      allDay: false,
      start: '2021-09-03T09:00:00',
      end: '2021-09-03T09:30:00',
    },
  ].map((dto: EventDTO) => new EventModel(dto)); // TODO: store 변수로 대체

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
