import { EventModel } from '@/stores/model/EventModel';
import { EventListViewContainer, DateInfo, DateDay, Holiday, Lunar } from './EventListView.style';
import EventItem from './EventItem';
import NoResult from './NoResult';
import { useCalendarStores } from '@/stores/StoreProvider';
import { Observer } from 'mobx-react-lite';
import { useCallback, useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { autorun } from 'mobx';
import { useLocation, useNavigate } from 'react-router-dom';

const EventListView = () => {
  const { calendarStore, uiStore, eventStore } = useCalendarStores();
  const [eventList, setEventList] = useState([]);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const fetchData = async (dateDay: DateTime) => {
    const day = dateDay.toFormat('yyyy-MM-dd');
    const { eventList } = await calendarStore.getCalendarInfo(14, day, day);
    setEventList(eventList);
  };
  // const eventList: EventModel[] = [
  //   {
  //     id: 0,
  //     calId: 0,
  //     calName: '캐릭터A의 캘린더',
  //     color: '#FF46B5',
  //     importance: true,
  //     title: '일정 제목',
  //     allDay: false,
  //     start: '2021-09-03T09:00:00',
  //     end: '2021-09-03T09:30:00',
  //   },
  //   {
  //     id: 1,
  //     calId: 0,
  //     calName: '캐릭터A의 캘린더',
  //     color: '#3384FF',
  //     importance: false,
  //     title: '일정 제목',
  //     allDay: false,
  //     start: '2021-09-03T09:00:00',
  //     end: '2021-09-03T09:30:00',
  //   },
  // ].map((dto: EventDTO) => new EventModel(dto)); // TODO: store 변수로 대체

  const getDateDay = (): string => {
    const { dateDay } = uiStore;
    return dateDay.toFormat('MM월 dd일 ') + ['', '월', '화', '수', '목', '금', '토', '일'][dateDay.weekday] + '요일';
  };

  const handleClickEvent = useCallback((id: number) => {
    eventStore.eventId = id;
    if (!pathname.includes('detail')) navigate(`/main/detail`);
  }, []);

  useEffect(() => {
    autorun(() => {
      const { dateDay } = uiStore;
      fetchData(dateDay);
    });
    return () => setEventList([]);
  }, []);

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
      {eventList.length > 0 ? (
        eventList.map((event, index) => <EventItem key={index} event={event} onClick={handleClickEvent} />)
      ) : (
        <NoResult />
      )}
    </EventListViewContainer>
  );
};

export default EventListView;
