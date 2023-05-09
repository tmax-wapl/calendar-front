import { useState, useCallback, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { DateTime } from 'luxon';
import { LoadingSpinner, SearchField } from '@wapl/ui';
import { EventModel } from '@/stores';
import { useCalendarStores } from '@/stores/StoreProvider';
import {
  EventSearchViewContainer,
  SearchFieldContainer,
  SearchFieldWrapper,
  SearchEventList,
  TextButton,
  MonthInfo,
  DateInfo,
} from './EventSearchView.style';
import EventItem from './EventItem';

const EventSearchView = () => {
  const [keyword, setKeyword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchEventMap, setSearchEventMap] = useState<Map<string, Map<string, EventModel[]>>>(new Map());
  const navigate = useNavigate();
  const { eventStore, uiStore } = useCalendarStores();

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleKeywordClear = () => {
    setKeyword('');
  };

  const groupByMonth = (eventList: EventModel[]) => {
    const eventMap = new Map<string, Map<string, EventModel[]>>();
    eventList.forEach(event => {
      const month = event.startDate.toFormat('yyyy-LL');
      const date = event.startDate.toFormat('yyyy-LL-dd');
      if (eventMap.has(month)) {
        eventMap
          .get(month)
          .set(date, eventMap.get(month).has(date) ? [...eventMap.get(month).get(date), event] : [event]);
      } else {
        eventMap.set(month, new Map([[date, [event]]]));
      }
    });
    return eventMap;
  };

  const handleSearch = async (value: string) => {
    if (!value.trim()) return;
    setIsLoading(true);
    const res = await eventStore.searchEvent(value.trim(), 'T');
    setSearchEventMap(groupByMonth(res));
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') handleSearch(keyword);
  };

  const handleCancelClick = () => {
    navigate(-1);
  };

  const getMonthInfo = (date: DateTime) => {
    const isThisYear = DateTime.now().hasSame(date, 'year');
    return isThisYear ? date.toFormat('LLL', { locale: 'ko' }) : date.toFormat('yyyy년 LLL', { locale: 'ko' });
  };

  const handleEventClick = useCallback(async (event: EventModel) => {
    const eventInfo = await eventStore.getEventInfo(+event.id, event.start);
    eventStore.setEvent(eventInfo);
    uiStore.setPageDialogInfo('detail');
  }, []);

  return (
    <EventSearchViewContainer>
      <SearchFieldContainer>
        <SearchFieldWrapper>
          <SearchField
            variant="filled"
            placeholder="캘린더 일정 검색"
            value={keyword}
            onChange={handleKeywordChange}
            onClear={handleKeywordClear}
            onSearch={handleSearch}
            onKeyPress={handleKeyPress}
            autoFocus
          />
        </SearchFieldWrapper>
        <TextButton onClick={handleCancelClick}>취소</TextButton>
      </SearchFieldContainer>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <SearchEventList>
          {Array.from(searchEventMap).map(([month, eventMap]) => (
            <Fragment key={month}>
              <MonthInfo>{getMonthInfo(DateTime.fromISO(month))}</MonthInfo>
              {Array.from(eventMap).map(([date, eventList]) => (
                <Fragment key={date}>
                  <DateInfo>{DateTime.fromISO(date).toFormat('dd일 cccc', { locale: 'ko' })}</DateInfo>
                  {eventList.map(event => (
                    <EventItem key={event.id} event={event} onClick={handleEventClick} />
                  ))}
                </Fragment>
              ))}
            </Fragment>
          ))}
        </SearchEventList>
      )}
    </EventSearchViewContainer>
  );
};

export default EventSearchView;
