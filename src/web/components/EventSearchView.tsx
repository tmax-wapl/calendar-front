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
  const [eventMap, setEventMap] = useState<Map<string, EventModel[]>>(null);
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

  useEffect(() => {
    if (!eventStore.searchKeyword) {
      navigate(`/main/view-mode/${uiStore.viewMode}/date`);
      return;
    }
    const dispose = autorun(async () => {
      setIsLoading(true);
      const res = await eventStore.searchEvent(eventStore.searchKeyword, 'T');
      setEventMap(res);
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
          {Array.from(eventMap).map(([date, eventList], index) => (
            <React.Fragment key={index}>
              <DateInfo date={DateTime.fromISO(date)} highlightToday={isToday(DateTime.fromISO(date))} />
              <EventListWrapper>
                {eventList.map((event, index) => (
                  <EventItem key={index} event={event} onClick={handleEventClick} />
                ))}
              </EventListWrapper>
            </React.Fragment>
          ))}
          {!eventMap?.size && <NoResult type={'search'} subtitle={eventStore.searchKeyword} />}
        </>
      )}
    </EventSearchViewContainer>
  );
};

export default EventSearchView;
