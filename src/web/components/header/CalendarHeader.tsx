import {
  ButtonWrapper,
  CalendarHeaderContainer,
  DateButton,
  NextButton,
  PrevButton,
  TodayButton,
  ViewSelect,
} from './ClaendarHeader.style';

const CalendarHeader: React.FC = () => {
  return (
    <CalendarHeaderContainer>
      <div style={{ display: 'flex' }}>
        <DateButton>2022.11</DateButton>
        <ButtonWrapper>
          <PrevButton />
          <NextButton />
        </ButtonWrapper>
        <TodayButton>오늘</TodayButton>
      </div>
      <div style={{ display: 'flex' }}>
        <ViewSelect>
          <option>월</option>
          <option>주</option>
          <option>일</option>
        </ViewSelect>
      </div>
    </CalendarHeaderContainer>
  );
};

export default CalendarHeader;
