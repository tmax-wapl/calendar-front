import { ROUTES } from '@common/constants/routes';
import React from 'react';
import { Link } from 'react-router-dom';
import { EventHeaderContainer, EventCreateButton, SearchBar } from './EventHeader.style';

const EventHeader: React.FC = () => {
  return (
    <EventHeaderContainer>
      <Link to={ROUTES.PATH_CREATE}>
        <EventCreateButton>새 일정</EventCreateButton>
      </Link>
      <SearchBar type="search" placeholder="캘린더 일정 검색" />
    </EventHeaderContainer>
  );
};

export default React.memo(EventHeader);
