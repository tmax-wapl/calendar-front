import React, { useEffect, useState } from 'react';
import {
  ButtonWrapper,
  CalendarHeaderContainer,
  DateButton as DateButtonComponent,
  LeftContainer,
  LeftContainer as RightContainer,
  NextButton,
  PrevButton,
  StyledDatePickerWrapper,
  TodayButton,
  ViewSelect,
} from './CalendarHeader.style';
import { useCalendarStores } from '@/stores/StoreProvider';
import { DateTime } from 'luxon';
import { DATE_EVENT, VIEW_MODE } from '@constants/common';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { isEqualMonth, toDateString } from '@/utils';
import DatePicker from '@/common/components/DatePicker/DatePicker';
import { autorun } from 'mobx';

type DateHandleType = DATE_EVENT.PREV | DATE_EVENT.NEXT | DATE_EVENT.TODAY;

const DateButton = ({ selected = false, togglePicker }: { selected?: boolean; togglePicker?: () => void }) => {
  const [title, setTitle] = useState<string>('');
  const { uiStore } = useCalendarStores();
  useEffect(() => {
    const dispose = autorun(() => {
      const { view } = uiStore.dateRange;
      setTitle(view.toFormat('yyyy.MM'));
    });
    return () => dispose();
  }, []);

  return (
    <DateButtonComponent
      className={selected ? 'selected' : ''}
      {...(togglePicker && { onClick: () => togglePicker() })}
    >
      {title}
    </DateButtonComponent>
  );
};

const CalendarHeader: React.FC = () => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);
  const { uiStore } = useCalendarStores();
  const navigate = useNavigate();
  const { viewMode } = useParams();
  const { pathname } = useLocation();

  const handleViewChange = (value: string) => {
    const mainApi = uiStore.getApi();
    uiStore.viewMode = value;
    if (pathname.includes('view-mode')) navigate(`view-mode/${uiStore.viewMode}`, { replace: true });
    mainApi?.changeView(value);
    handleDayMaxEvents();
  };

  const handleDayMaxEvents = () => {
    const mainApi = uiStore.getApi();
    switch (uiStore.viewMode) {
      case VIEW_MODE.MONTH:
        mainApi?.setOption('dayMaxEvents', 5);
        uiStore.changeDateRange();
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
    uiStore.changeDateRange();
  };

  const togglePicker = () => setIsDatePickerOpen(!isDatePickerOpen);

  return (
    <CalendarHeaderContainer>
      <LeftContainer>
        <DateButton selected={isDatePickerOpen} togglePicker={togglePicker} />
        {isDatePickerOpen && (
          <StyledDatePickerWrapper>
            <DatePicker
              date={uiStore.dateRange.view}
              onDateClick={selectedDate => uiStore.handleDateClick(selectedDate, togglePicker)}
              onOutsideClick={togglePicker}
            />
          </StyledDatePickerWrapper>
        )}
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
          defaultValue={viewMode ?? VIEW_MODE.MONTH}
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
