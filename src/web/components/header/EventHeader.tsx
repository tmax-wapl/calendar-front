import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCalendarStores } from '@/stores/StoreProvider';
import { EventHeaderContainer, EventCreateButton, SearchField } from './EventHeader.style';

const EventHeader: React.FC = () => {
  const { uiStore } = useCalendarStores();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleCreateClick = () => {
    navigate(`view-mode/${uiStore.viewMode}/create`, {
      state: {
        isModify: !!pathname.includes('create'),
      },
    });
  };

  return (
    <EventHeaderContainer>
      <EventCreateButton onClick={handleCreateClick}>새 일정</EventCreateButton>

      {/* <SearchBar type="search" placeholder="캘린더 일정 검색" /> */}
      <SearchField style={{ visibility: 'hidden' }} placeholder="캘린더 일정 검색" variant="filled" width={280} />
    </EventHeaderContainer>
  );
};

export default React.memo(EventHeader);
