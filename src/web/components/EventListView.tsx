import { EventListViewContainer, EventListWrapper } from './EventListView.style';
import DateInfo from './DateInfo';
import EventItem from './EventItem';
import NoResult from './NoResult';
import { useCalendarStores } from '@/stores/StoreProvider';
import { useCallback, useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { autorun } from 'mobx';
import { useLocation, useNavigate } from 'react-router-dom';
import { toISO, toLuxon } from '@/utils';
import { EventModel } from '@/stores/model/EventModel';
import { VIEW_MODE } from '@/common/constants';

const EventListView = () => {
  const { uiStore, eventStore, calendarStore } = useCalendarStores();
  const [eventList, setEventList] = useState([]);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleClickEvent = useCallback(async (event: EventModel) => {
    const eventInfo = await eventStore.getEventInfo(+event.id, event.start, event.roomId);
    eventStore.setEvent(eventInfo);
    if (!pathname.includes('detail')) navigate(`/main/view-mode/${uiStore.viewMode}/detail`);
  }, []);

  useEffect(() => {
    const fetchData = async (dateDay: DateTime) => {
      const date = dateDay.startOf('day');
      const eventList = calendarStore.eventList
        .filter(
          event =>
            date < toLuxon(event.end) &&
            toLuxon(event.start) < date.plus({ days: 1 }) &&
            (event.importance || !uiStore.isImportanceChecked),
        )
        .sort((a, b) => (b.importance ? 1 : 0) - (a.importance ? 1 : 0));

      setEventList(eventList);
    };
    const dispose = autorun(() => {
      fetchData(uiStore.dateDay);
      uiStore.viewMode === VIEW_MODE.MONTH && uiStore.mainApi?.select(toISO(uiStore.dateDay));
    });
    return () => dispose();
  }, []);

  return (
    <EventListViewContainer>
      <DateInfo date={uiStore.dateDay} />
      {eventList.length > 0 ? (
        <EventListWrapper>
          {eventList.map((event, index) => (
            <EventItem key={index} event={event} onClick={handleClickEvent} />
          ))}
        </EventListWrapper>
      ) : (
        <NoResult />
      )}
    </EventListViewContainer>
  );
};

export default EventListView;
