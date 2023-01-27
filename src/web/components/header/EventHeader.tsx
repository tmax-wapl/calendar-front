import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCalendarStores } from '@/stores/StoreProvider';
import { EventModel } from '@/stores/model/EventModel';
import { ROUTES } from '@common/constants/routes';
import { EventHeaderContainer, EventCreateButton, SearchField } from './EventHeader.style';

const EventHeader: React.FC = () => {
  const { eventStore, uiStore } = useCalendarStores();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleCreateClick = () => {
    eventStore.setEvent(new EventModel({}));
    if (!pathname.includes('create')) navigate(`view-mode/${uiStore.viewMode}/create`);
  };

  return (
    <EventHeaderContainer>
      <EventCreateButton onClick={handleCreateClick}>새 일정</EventCreateButton>

      {/* <SearchBar type="search" placeholder="캘린더 일정 검색" /> */}
      <SearchField placeholder="캘린더 일정 검색" variant="filled" width={360} />
    </EventHeaderContainer>
  );
};

export default React.memo(EventHeader);
