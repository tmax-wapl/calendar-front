import { useState, useCallback, useEffect, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { autorun } from 'mobx';
import { DateTime } from 'luxon';
import { EventModel } from '@/stores';
import { useCalendarStores } from '@/stores/StoreProvider';
import { isSameDate } from '@/utils';
import { EventSearchViewContainer, EventListWrapper } from './EventSearchView.style';
import DateInfo from './DateInfo';
import EventItem from './EventItem';
import NoResult from './NoResult';
import { Loader } from '@/common/components/Loader';
import { Virtuoso } from 'react-virtuoso';

const EventSearchView = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchEventList, setSearchEventList] = useState<[string, EventModel[]][]>(null);
  const { eventStore, uiStore } = useCalendarStores();
  const navigate = useNavigate();

  const isToday = (date: DateTime) => isSameDate(date, DateTime.now());

  const handleEventClick = useCallback(async (event: EventModel) => {
    const eventInfo = await eventStore.getEventInfo(+event.id, event.start);
    uiStore.setDateDay(eventInfo.startDate.startOf('day'));
    eventStore.setEvent(eventInfo);
    navigate(`/main/view-mode/${uiStore.viewMode}/detail`);
  }, []);

  const groupByDate = (eventList: EventModel[]) => {
    const eventMap = new Map<string, EventModel[]>();
    eventList.forEach(event => {
      const date = event.startDate.toFormat('yyyy-LL-dd');
      eventMap.set(date, eventMap.has(date) ? [...eventMap.get(date), event] : [event]);
    });
    return eventMap;
  };

  useEffect(() => {
    if (!eventStore.searchKeyword) {
      navigate(`/main/view-mode/${uiStore.viewMode}/date`);
      return;
    }
    const dispose = autorun(async () => {
      setIsLoading(true);
      const res = await eventStore.searchEvent(eventStore.searchKeyword, 'T');
      setSearchEventList(Array.from(groupByDate(res)));
      setIsLoading(false);
    });
    return () => {
      dispose();
      eventStore.setSearchKeyword('');
    };
  }, []);

  const SearchItem = useCallback((_: number, data: [string, EventModel[]]) => <EventList data={data} />, []);

  const EventList = memo(({ data }: { data: [string, EventModel[]] }) => {
    const [date, eventList] = data;
    return (
      <>
        <DateInfo date={DateTime.fromISO(date)} highlightToday={isToday(DateTime.fromISO(date))} />
        <EventListWrapper>
          {eventList.map((event, index) => (
            <EventItem key={index} event={event} onClick={handleEventClick} />
          ))}
        </EventListWrapper>
      </>
    );
  });

  return (
    <EventSearchViewContainer>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {searchEventList?.length > 0 ? (
            <Virtuoso data={searchEventList} itemContent={SearchItem} />
          ) : (
            <NoResult type={'search'} subtitle={eventStore.searchKeyword} />
          )}
        </>
      )}
    </EventSearchViewContainer>
  );
};

export default EventSearchView;
