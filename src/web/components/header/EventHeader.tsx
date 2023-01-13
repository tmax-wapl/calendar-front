import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@common/constants/routes';
import { EventHeaderContainer, EventCreateButton, SearchField } from './EventHeader.style';

const EventHeader: React.FC = () => {
  return (
    <EventHeaderContainer>
      <Link to={ROUTES.PATH_CREATE}>
        <EventCreateButton>새 일정</EventCreateButton>
      </Link>
      {/* <SearchBar type="search" placeholder="캘린더 일정 검색" /> */}
      <SearchField placeholder="캘린더 일정 검색" variant="filled" width={360} />
    </EventHeaderContainer>
  );
};

export default React.memo(EventHeader);
