import { EventHeaderContainer, EventCreateButton, SearchBar } from './EventHeader.style';

const EventHeader: React.FC = () => {
  return (
    <EventHeaderContainer>
      <EventCreateButton>새 일정</EventCreateButton>
      <SearchBar type="search" placeholder="캘린더 일정 검색" />
    </EventHeaderContainer>
  );
};

export default EventHeader;
