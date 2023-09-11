import { styled } from '@wapl/ui';
import { DateTime } from 'luxon';
import { PickersDay } from '@mui/x-date-pickers';

export const TodayScheduleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HeaderContainer = styled.div<{ size: number }>`
  display: flex;
  justify-content: start;
  gap: 20px;
  height: calc(208px * ${({ size }) => size} + 30px);
  margin-bottom: 30px;
`;
export const EventInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  ${({ theme: { Font } }) => Font.Text.s.Regular};
  color: ${({ theme: { Color } }) => Color.Gray[600]};
`;

export const ItemTitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const EventItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  box-sizing: border-box;
  padding: 12px 0 10px;
`;

export const EventColor = styled.span<{ color: string }>`
  width: 13px;
  height: 100%;
  margin-right: 10px;
  background: ${({ color }) => color};
`;

export const DateInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
  height: fit-content;
  cursor: pointer;
`;

export const EventWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 35px;
  cursor: pointer;
`;

export const DatePickerBody = styled.div<{ size: number }>`
  width: calc(224px * ${({ size }) => size});
  height: calc(208px * ${({ size }) => size});
  align-self: end;
  cursor: pointer;
`;

export const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const NoResultContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const EventInfo = styled.span``;

export const MoreResultText = styled.span`
  font-size: 12px;
  color: ${({ theme: { Color } }) => Color.Gray[500]};
  cursor: pointer;
`;

export const NoResultTitle = styled.span`
  display: flex;
  font-size: 14px;
  :first-of-type {
    margin-top: 20px;
  }
  :last-of-type {
    margin-bottom: 50px;
  }
`;

export const DateDayText = styled.span`
  font-size: 40px;
  font-weight: bold;
`;

export const LunarText = styled.span`
  color: ${({ theme: { Color } }) => Color.Gray[500]};
  font-size: 12px;
`;

export const HolidayText = styled.span`
  ${({ theme: { Font } }) => Font.Text.s.Regular};
  color: ${({ theme: { Color } }) => Color.Validation.negative};
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
