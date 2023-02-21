import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCalendarStores } from '@/stores/StoreProvider';
import { EventModel } from '@/stores/model/EventModel';
import { EventHeaderContainer, EventCreateButton, SearchField } from './EventHeader.style';
import { getStartDate, toISO } from '@/utils';

const EventHeader: React.FC = () => {
  const { calendarStore, eventStore, uiStore } = useCalendarStores();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleCreateClick = () => {
    if (!pathname.includes('create')) {
      navigate(`view-mode/${uiStore.viewMode}/create`);
      return;
    }
    const start = getStartDate(uiStore.dateDay).toUTC();
    const calId = calendarStore.getCalendarId();
    eventStore.setEvent(
      new EventModel({
        calId: calId,
        start: toISO(start),
        end: toISO(start.plus({ minutes: 30 })),
      }),
    );
  };

  return (
    <EventHeaderContainer>
      <EventCreateButton onClick={handleCreateClick}>새 일정</EventCreateButton>

      {/* <SearchBar type="search" placeholder="캘린더 일정 검색" /> */}
      <SearchField placeholder="캘린더 일정 검색" variant="filled" width={280} />
    </EventHeaderContainer>
  );
};

export default React.memo(EventHeader);
