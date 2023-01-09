import { EventListViewContainer, DateInfo, DateDay, Holiday, Lunar } from './EventListView.style';
import EventItem from './EventItem';
import NoResult from './NoResult';
import { useCalendarStores } from '@/stores/StoreProvider';
import { Observer } from 'mobx-react-lite';
import { useCallback, useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { getLunar } from 'holiday-kr';
import { autorun } from 'mobx';
import { useLocation, useNavigate } from 'react-router-dom';

const EventListView = () => {
  const { uiStore, eventStore } = useCalendarStores();
  const [eventList, setEventList] = useState([]);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const fetchData = async (dateDay: DateTime) => {
    const date = dateDay.toFormat('yyyy-LL-dd');
    const eventList = await eventStore.getEventList(145, date);
    setEventList(eventList);
  };

  const getDateDay = (): string => {
    const { dateDay } = uiStore;
    return dateDay.toFormat('MM월 dd일 ') + ['', '월', '화', '수', '목', '금', '토', '일'][dateDay.weekday] + '요일';
  };

  const handleClickEvent = useCallback((id: number) => {
    eventStore.eventId = id;
    if (!pathname.includes('detail')) navigate(`/main/detail`);
  }, []);

  useEffect(() => {
    const dispose = autorun(() => {
      const { dateDay } = uiStore;
      fetchData(dateDay);
    });
    return () => {
      setEventList([]);
      dispose();
    };
  }, []);

  const lunar = () => {
    const { dateDay } = uiStore;
    const { month, day } = getLunar(dateDay.toJSDate());
    return `음력 ${month}.${day}`;
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
                <Lunar>{lunar()}</Lunar>
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
