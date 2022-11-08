import {
  ButtonWrapper,
  CalendarHeaderContainer,
  DateButton,
  NextButton,
  PrevButton,
  TodayButton,
  ViewSelect,
} from './ClaendarHeader.style';
import React from 'react';

const CalendarHeader: React.FC = () => {
  const handlePrevMonth = () => {
    console.log('prev');
  };

  const handleNextMonth = () => {
    console.log('next');
  };

  const handleViewChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    console.log(value);
  };

  return (
    <CalendarHeaderContainer>
      <div style={{ display: 'flex' }}>
        <DateButton>2022.11</DateButton>
        <ButtonWrapper>
          <PrevButton onClick={handlePrevMonth} />
          <NextButton onClick={handleNextMonth} />
        </ButtonWrapper>
        <TodayButton>오늘</TodayButton>
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
