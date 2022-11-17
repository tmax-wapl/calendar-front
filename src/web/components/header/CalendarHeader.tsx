import React, { useEffect, useState } from 'react';
import {
  ButtonWrapper,
  CalendarHeaderContainer,
  DateButton as DateButtonComponent,
  LeftContainer,
  LeftContainer as RightContainer,
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

  const handleViewChange = (value: string) => {
    const mainApi = uiStore.getApi();
    uiStore.setViewMode(value);
    mainApi?.changeView(value);
    handleDayMaxEvents();
  };

  const handleDayMaxEvents = () => {
    const mainApi = uiStore.getApi();
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
    const mainApi = uiStore.getApi();
    mainApi?.[type]();
    setDateRange({
      start: dateRange.start,
      view: DateTime.fromJSDate(mainApi?.getDate()),
      end: dateRange.end,
    });
  };

  return (
    <CalendarHeaderContainer>
      <LeftContainer>
        <DateButton />
        <ButtonWrapper>
          <PrevButton onClick={() => handleDate(DATE_EVENT.PREV)} />
          <NextButton onClick={() => handleDate(DATE_EVENT.NEXT)} />
        </ButtonWrapper>
        <TodayButton onClick={() => handleDate(DATE_EVENT.TODAY)}>오늘</TodayButton>
      </LeftContainer>
      <RightContainer>
        <ViewSelect
          name="viewSelect"
          types="box"
          defaultValue={VIEW_MODE.MONTH}
          items={[
            {
              label: '월',

              value: VIEW_MODE.MONTH,
            },
            {
              label: '주',
              value: VIEW_MODE.WEEK,
            },
          ]}
          onChange={handleViewChange}
        />
      </RightContainer>
    </CalendarHeaderContainer>
  );
};

export default CalendarHeader;
