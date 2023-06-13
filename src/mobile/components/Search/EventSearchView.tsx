import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchField } from '@wapl/ui';
import { EventModel } from '@/stores';
import { useCalendarStores } from '@/stores/StoreProvider';
import {
  EventSearchViewContainer,
  SearchFieldContainer,
  SearchFieldWrapper,
  TextButton,
} from './EventSearchView.style';
import SearchEventList from './SearchEventList';
import { Loader } from '@/common/components/Loader';

interface SearchResult {
  eventMap: Map<string, Map<string, EventModel[]>>;
  isEmpty: boolean;
  keyword: string;
}

const EventSearchView = () => {
  const [keyword, setKeyword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<SearchResult>(null);
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
    const eventMap = groupByMonth(res);
    setSearchResult({ eventMap, isEmpty: eventMap.size === 0, keyword });
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') handleSearch(keyword);
  };

  const handleCancelClick = () => {
    navigate(-1);
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
        <Loader />
      ) : (
        <SearchEventList
          searchEventMap={searchResult?.eventMap || new Map()}
          onEventClick={handleEventClick}
          isEmpty={searchResult?.isEmpty}
          keyword={searchResult?.keyword}
        />
      )}
    </EventSearchViewContainer>
  );
};

export default EventSearchView;
