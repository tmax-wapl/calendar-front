import { EventListViewContainer, EventListWrapper } from './EventListView.style';
import EventItem from './EventItem';
import NoResult from '@/web/components/NoResult';
import { useCalendarStores } from '@/stores/StoreProvider';
import { ForwardedRef, useCallback, useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { autorun } from 'mobx';
import { toISO, toLuxon } from '@/utils';
import { EventModel } from '@/stores/model/EventModel';
import { VIEW_MODE } from '@/common/constants';
import { DateInfo } from './DateInfo/externals';
import { Observer } from 'mobx-react-lite';

const EventListView = ({ bottomElement }: { bottomElement: ForwardedRef<HTMLDivElement> }) => {
  const { uiStore, eventStore, calendarStore } = useCalendarStores();
  const [eventList, setEventList] = useState([]);

  const handleClickEvent = useCallback(async (event: EventModel) => {
    const eventInfo = await eventStore.getEventInfo(+event.id, event.start);
    eventStore.setEvent(eventInfo);
    uiStore.setPageDialogInfo('detail');
  }, []);

  useEffect(() => {
    const fetchData = async (dateDay: DateTime) => {
      const date = dateDay.startOf('day');
      const eventList = calendarStore.eventList.filter(
        event =>
          date < toLuxon(event.end) &&
          toLuxon(event.start) < date.plus({ days: 1 }) &&
          (event.importance || !uiStore.isImportanceChecked),
      );
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
      <Observer>
        {() => (
          <DateInfo
            date={uiStore.dateDay}
            holydayList={calendarStore.holidayList}
            isHolidayChecked={uiStore.isHolidayChecked}
            isLunarChecked={uiStore.isLunarChecked}
            backgroundColor={'#f8f9fa'}
          />
        )}
      </Observer>
      {eventList.length > 0 ? (
        <EventListWrapper ref={bottomElement} className={'listView'}>
          {eventList.map((event, index) => (
            <EventItem key={index} event={event} onClick={handleClickEvent} />
          ))}
        </EventListWrapper>
      ) : (
        <div ref={bottomElement} style={{ height: '100%' }}>
          <NoResult />
        </div>
      )}
    </EventListViewContainer>
  );
};
export default EventListView;
