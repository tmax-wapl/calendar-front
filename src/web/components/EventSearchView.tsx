import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { autorun } from 'mobx';
import { DateTime } from 'luxon';
import { EventModel } from '@/stores';
import { useCalendarStores } from '@/stores/StoreProvider';
import { LoadingSpinner } from '@wapl/ui';
import { isSameDate } from '@/utils';
import { EventSearchViewContainer, EventListWrapper } from './EventSearchView.style';
import DateInfo from './DateInfo';
import EventItem from './EventItem';
import NoResult from './NoResult';

const EventSearchView = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchEventMap, setSearchEventMap] = useState<Map<string, EventModel[]>>(null);
  const { eventStore, uiStore } = useCalendarStores();
  const navigate = useNavigate();

  const isToday = (date: DateTime) => {
    return isSameDate(date, DateTime.now());
  };

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
      setSearchEventMap(groupByDate(res));
      setIsLoading(false);
    });
    return () => {
      dispose();
      eventStore.setSearchKeyword('');
    };
  }, []);

  return (
    <EventSearchViewContainer>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {Array.from(searchEventMap).map(([date, eventList], index) => (
            <React.Fragment key={index}>
              <DateInfo date={DateTime.fromISO(date)} highlightToday={isToday(DateTime.fromISO(date))} />
              <EventListWrapper>
                {eventList.map((event, index) => (
                  <EventItem key={index} event={event} onClick={handleEventClick} />
                ))}
              </EventListWrapper>
            </React.Fragment>
          ))}
          {!searchEventMap?.size && <NoResult type={'search'} subtitle={eventStore.searchKeyword} />}
        </>
      )}
    </EventSearchViewContainer>
  );
};

export default EventSearchView;
