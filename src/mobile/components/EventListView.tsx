import { EventListViewContainer, DateInfo, DateDay, Holiday, Lunar, EventListWrapper } from './EventListView.style';
import EventItem from './EventItem';
import NoResult from '@/web/components/NoResult';
import { useCalendarStores } from '@/stores/StoreProvider';
import { Observer } from 'mobx-react-lite';
import { ForwardedRef, useCallback, useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { getLunar } from 'holiday-kr';
import { autorun } from 'mobx';
import { toISO, toLuxon } from '@/utils';
import { EventModel } from '@/stores/model/EventModel';
import { VIEW_MODE } from '@/common/constants';

const EventListView = ({ bottomElement }: { bottomElement: ForwardedRef<HTMLDivElement> }) => {
  const { uiStore, eventStore, calendarStore } = useCalendarStores();
  const [eventList, setEventList] = useState([]);

  const getDateDay = (): string => {
    const { dateDay } = uiStore;
    return dateDay.toFormat('dd일 cccc', { locale: 'ko' });
  };

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

  const lunar = () => {
    const { dateDay } = uiStore;
    const { month, day } = getLunar(dateDay.toJSDate());
    return `음력 ${month}.${day}`;
  };

  const holiday = () => {
    const { dateDay } = uiStore;
    const holidayList = calendarStore.holidayList.filter(holiday => holiday.dateDay === dateDay.toFormat('yyyy-LL-dd'));

    return (
      <>
        {holidayList.map((holiday, index) => (
          <Holiday key={index} isRed={holiday.isRed}>
            {holiday.name}
          </Holiday>
        ))}
      </>
    );
  };

  return (
    <EventListViewContainer>
      <DateInfo>
        <Observer>
          {() => {
            return (
              <>
                <DateDay>{getDateDay()}</DateDay>
                {uiStore.isHolidayChecked && holiday()}
                {uiStore.isLunarChecked && <Lunar isRed={false}>{lunar()}</Lunar>}
              </>
            );
          }}
        </Observer>
      </DateInfo>
      {eventList.length > 0 ? (
        <EventListWrapper ref={bottomElement} className={'listView'}>
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
