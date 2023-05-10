import { Fragment, memo } from 'react';
import { DateTime } from 'luxon';
import { EventModel } from '@/stores';
import { SearchEventListContainer, MonthInfo, DateInfo } from './SearchEventList.style';
import EventItem from '../EventItem';
import NoResult from '../NoResult';

interface Props {
  searchEventMap: Map<string, Map<string, EventModel[]>>;
  onEventClick?: (event: EventModel) => void;
  isEmpty?: boolean;
  keyword?: string;
}

const SearchEventList = ({ searchEventMap, onEventClick, isEmpty, keyword }: Props) => {
  const getMonthInfo = (date: DateTime) => {
    const isThisYear = DateTime.now().hasSame(date, 'year');
    return isThisYear ? date.toFormat('LLL', { locale: 'ko' }) : date.toFormat('yyyy년 LLL', { locale: 'ko' });
  };

  return (
    <SearchEventListContainer>
      {Array.from(searchEventMap).map(([month, eventMap]) => (
        <Fragment key={month}>
          <MonthInfo>{getMonthInfo(DateTime.fromISO(month))}</MonthInfo>
          {Array.from(eventMap).map(([date, eventList]) => (
            <Fragment key={date}>
              <DateInfo>{DateTime.fromISO(date).toFormat('dd일 cccc', { locale: 'ko' })}</DateInfo>
              {eventList.map(event => (
                <EventItem key={event.id} event={event} onClick={onEventClick} />
              ))}
            </Fragment>
          ))}
        </Fragment>
      ))}
      {isEmpty && <NoResult type={'search'} subtitle={keyword} />}
    </SearchEventListContainer>
  );
};

export default memo(SearchEventList);
