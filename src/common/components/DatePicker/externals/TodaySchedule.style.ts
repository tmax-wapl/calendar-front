import { styled } from '@wapl/ui';
import { DateTime } from 'luxon';
import { PickersDay } from '@mui/x-date-pickers';

export const TodayScheduleContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding-top: 24px;
  width: 416px;
  height: 458px;
`;

export const HeaderContainer = styled.div<{ size: number }>`
  margin: 0 30px;
  display: flex;
  justify-content: space-between;
`;

export const EventInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  ${({ theme: { Font } }) => Font.Text.s.Regular};
  color: ${({ theme: { Color } }) => Color.Gray[600]};
  margin-left: 28px;
`;

export const ItemTitleContainer = styled.div`
  display: flex;
  align-items: center;
  > svg:first-of-type {
    margin-right: 10px !important;
  }
`;

export const EventItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  box-sizing: border-box;
`;

export const DateInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  cursor: pointer;
  > * {
    :first-of-type {
      margin-bottom: 24px;
    }
    :nth-of-type(2),
    :nth-of-type(3) {
      margin-bottom: 12px;
    }
    :not(:first-of-type):not(:nth-of-type(2)):not(:nth-of-type(3)):not(:last-of-type) {
      margin-bottom: 4px;
    }
    :last-of-type {
      margin: 0;
    }
  }
`;

export const EventWrapper = styled.div`
  display: flex;
  margin: 12px 0 10px;
  width: 100%;
  height: 40px;
  cursor: pointer;
  gap: 10px;
`;

export const EventTitle = styled.span`
  ${({ theme: { Font } }) => Font.Text.m.Regular};
  color: ${({ theme: { Color } }) => Color.Gray[900]};
  display: block;
  flex: 1;
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const DatePickerBody = styled.div<{ size: number }>`
  width: calc(224px * ${({ size }) => size});
  height: calc(208px * ${({ size }) => size});
  cursor: pointer;
`;

export const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 225px;
  padding: 0 24px;
`;

export const NoResultContainer = styled.div`
  display: flex;
  height: 225px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const EventInfo = styled.span``;

export const MoreResultText = styled.span`
  ${({ theme: { Font } }) => Font.Text.s.Regular};
  color: ${({ theme: { Color } }) => Color.Gray[600]};
  text-align: center;
  cursor: pointer;
`;

export const NoResultTitle = styled.span`
  ${({ theme: { Font } }) => Font.Text.s.Regular};
  color: ${({ theme: { Color } }) => Color.Gray[600]};
`;

export const DateYearText = styled.span`
  ${({ theme: { Font } }) => Font.Text.xl.Medium};
  color: ${({ theme: { Color } }) => Color.Gray[900]};
  font-weight: 500;
  line-height: 25px;
  text-align: right;
`;

export const DateDayText = styled.span`
  margin: 0;
  padding: 0;
  line-height: 40px;
  font-size: 40px;
  font-weight: 700;
  text-align: right;
`;

export const DateDaysOfWeekText = styled.span`
  ${({ theme: { Font } }) => Font.Text.l.Bold};
  color: ${({ theme: { Color } }) => Color.Gray[900]};
  line-height: 20px;
  text-align: right;
`;

export const LunarText = styled.span`
  ${({ theme: { Font } }) => Font.Text.xs.Regular};
  color: ${({ theme: { Color } }) => Color.Gray[500]};
  line-height: 15px;
  text-align: right;
`;

export const HolidayText = styled.span`
  ${({ theme: { Font } }) => Font.Text.s.Regular};
  color: ${({ theme: { Color } }) => Color.Validation.negative};
  line-height: 15px;
  text-align: right;
`;

export const CalendarHeaderContainer = styled.div<{ size: number }>`
  height: calc(16px * ${({ size }) => size});
  display: flex;
`;

export const CalendarHeader = styled.div<{ isRed: boolean }>`
  width: 100%;
  height: 100%;
  text-align: center;
  color: ${({ isRed, theme: { Color } }) => (isRed ? '#f44336' : Color.Gray[900])};
  ${({ theme: { Font } }) => Font.Text.xxs.Medium};
`;

export const CalendarContent = styled.div<{ size: number }>`
  width: 100%;
  height: calc(208px * ${({ size }) => size});
`;

export const CustomPickersDay = styled(PickersDay<DateTime>, {
  shouldForwardProp: (prop: string) => prop !== 'isOutside' && prop !== 'isSunday' && prop !== 'isLight',
})<{
  isOutside: boolean;
  isSunday: boolean;
  size: number;
  disableday?: boolean;
  isLight?: boolean;
  backgroundcolor?: string;
}>`
  width: calc(24px * ${({ size }) => size}) !important;
  height: calc(24px * ${({ size }) => size}) !important;
  margin: calc(4px * ${({ size }) => size}) !important;
  background-color: ${({ backgroundcolor, isLight, theme: { Color } }) =>
    backgroundcolor ? backgroundcolor : isLight ? Color.White[100] : Color.Gray[900]} !important;
  border: 0px !important;
  color: ${({ isOutside, isSunday, disableday, isLight, theme: { Color } }) =>
    isOutside
      ? isSunday
        ? 'rgba(244, 67, 54, 0.3)'
        : Color.Gray[400]
      : disableday
      ? Color.Gray[200]
      : isSunday
      ? '#F44336'
      : isLight
      ? Color.Gray[900]
      : Color.White[100]} !important;
  &.MuiPickersDay-root {
    ${({ theme: { Font } }) => Font.Text.xxs.Medium};
  }
  &.Mui-selected {
    border: 1px solid ${({ theme: { Color } }) => Color.Gray[900]} !important;
    background-color: ${({ theme: { Color } }) => Color.Gray[100]} !important;
  }
  &.MuiPickersDay-today {
    background-color: ${({ isOutside, theme: { Color } }) =>
      isOutside ? 'rgba(255, 98, 88, 0.3)' : Color.Scarlet[500]} !important;
    color: white !important;
  }
`;
