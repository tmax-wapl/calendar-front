import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { autorun } from 'mobx';
import { useCalendarStores } from '@/stores/StoreProvider';
import { EventHeaderContainer, EventCreateButton, SearchField } from './EventHeader.style';
import { DatePicker } from '@/common/components/DatePicker/externals/DatePicker';

const EventHeader: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const { uiStore, eventStore } = useCalendarStores();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const searchFieldRef = useRef(null);

  const handleCreateClick = () => {
    navigate(`view-mode/${uiStore.viewMode}/create`, {
      state: {
        isModify: !!pathname.includes('create'),
      },
    });
  };

  const handleSearch = (value: string) => {
    if (!value.trim()) return;
    eventStore.setSearchKeyword(value.trim());
    navigate(`view-mode/${uiStore.viewMode}/search`);
  };

  useEffect(() => {
    const dispose = autorun(() => {
      if (eventStore.searchKeyword) return;
      setKeyword('');
      (document.querySelector('.MuiFilledInput-input') as HTMLElement)?.blur();
    });
    return () => dispose();
  }, []);

  return (
    <EventHeaderContainer>
      <EventCreateButton onClick={handleCreateClick}>새 일정</EventCreateButton>
      <DatePicker open date={new Date()} disabledDateList={['2023-07-16', '2023-07-19', '2023-07-20', '2023-08-16']} />
      {/* <SearchBar type="search" placeholder="캘린더 일정 검색" /> */}
      <SearchField
        ref={searchFieldRef}
        placeholder="캘린더 일정 검색"
        variant="filled"
        width={280}
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        onClear={() => setKeyword('')}
        onSearch={handleSearch}
        onKeyPress={e => {
          if (e.code === 'Enter' || e.code === 'NumpadEnter') handleSearch(keyword);
        }}
      />
    </EventHeaderContainer>
  );
};

export default React.memo(EventHeader);
