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

  const handlePrevClick = () => {
    const { mainApi, miniApi } = uiStore.getApi();

    mainApi?.prev();
    miniApi?.gotoDate(mainApi.getDate());
    setDateRange({
      start: dateRange.start,
      view: DateTime.fromJSDate(mainApi?.getDate()),
      end: dateRange.end,
    });
  };

  const handleNextClick = () => {
    const { mainApi, miniApi } = uiStore.getApi();

    mainApi?.next();
    miniApi?.gotoDate(mainApi?.getDate());
    setDateRange({
      start: dateRange.start,
      view: DateTime.fromJSDate(mainApi?.getDate()),
      end: dateRange.end,
    });
  };

  const handleViewChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const { mainApi } = uiStore.getApi();
    mainApi?.changeView(value);
  };

  const handleToday = () => {
    const { mainApi, miniApi } = uiStore.getApi();
    mainApi?.today();
    miniApi?.today();
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
          <PrevButton onClick={handlePrevClick} />
          <NextButton onClick={handleNextClick} />
        </ButtonWrapper>
        <TodayButton onClick={handleToday}>오늘</TodayButton>
      </div>
      <div style={{ display: 'flex' }}>
        <ViewSelect onChange={handleViewChange}>
          <option value="dayGridMonth">월</option>
          <option value="timeGridWeek">주</option>
          <option value="timeGridDay">일</option>
        </ViewSelect>
      </div>
    </CalendarHeaderContainer>
  );
};

export default CalendarHeader;
