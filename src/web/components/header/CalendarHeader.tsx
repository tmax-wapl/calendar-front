import React, { useEffect, useState } from 'react';
import {
  ButtonWrapper,
  CalendarHeaderContainer,
  DateButton as DateButtonComponent,
  NextButton,
  PrevButton,
  TodayButton,
  ViewSelect,
} from './CalendarHeader.style';
import { useCalendarStores } from '@/stores/StoreProvider';
import { DateTime } from 'luxon';
import { observer } from 'mobx-react-lite';
import { DATE_EVENT, VIEW_MODE } from '@constants/common';

type DateHandleType = DATE_EVENT.PREV | DATE_EVENT.NEXT | DATE_EVENT.TODAY;

const DateButton = observer(() => {
  const [title, setTitle] = useState<string>('');
  const { uiStore } = useCalendarStores();
  const { dateRange } = uiStore;

  useEffect(() => {
    setTitle(dateRange.view.toFormat('yyyy.MM'));
  }, [dateRange, title]);

  return <DateButtonComponent>{title}</DateButtonComponent>;
});

const CalendarHeader: React.FC = () => {
  const { uiStore } = useCalendarStores();
  const { dateRange, setDateRange } = uiStore;

  const handleViewChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const { mainApi } = uiStore.getApi();
    uiStore.setViewMode(value);
    mainApi?.changeView(value);
    handleDayMaxEvents();
  };

  const handleDayMaxEvents = () => {
    const { mainApi } = uiStore.getApi();
    switch (uiStore.viewMode) {
      case VIEW_MODE.MONTH:
        mainApi?.setOption('dayMaxEvents', 5);
        break;
      case VIEW_MODE.WEEK:
        mainApi?.setOption('dayMaxEvents', 3);
        break;
      case VIEW_MODE.DAY:
        mainApi?.setOption('dayMaxEvents', false);
        break;
    }
  };

  const handleDate = (type: DateHandleType) => {
    const { mainApi, miniApi } = uiStore.getApi();
    mainApi?.[type]();
    miniApi?.[type]();
    setDateRange({
      start: dateRange.start,
      view: DateTime.fromJSDate(mainApi?.getDate()),
      end: dateRange.end,
    });
  };

  return (
    <CalendarHeaderContainer>
      <div style={{ display: 'flex' }}>
        <DateButton />
        <ButtonWrapper>
          <PrevButton onClick={() => handleDate(DATE_EVENT.PREV)} />
          <NextButton onClick={() => handleDate(DATE_EVENT.NEXT)} />
        </ButtonWrapper>
        <TodayButton onClick={() => handleDate(DATE_EVENT.TODAY)}>오늘</TodayButton>
      </div>
      <div style={{ display: 'flex' }}>
        <ViewSelect onChange={handleViewChange}>
          <option value={VIEW_MODE.MONTH}>월</option>
          <option value={VIEW_MODE.WEEK}>주</option>
          <option value={VIEW_MODE.DAY}>일</option>
        </ViewSelect>
      </div>
    </CalendarHeaderContainer>
  );
};

export default CalendarHeader;
