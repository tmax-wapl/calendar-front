import { styled } from '@wapl/ui';
import { DateTime } from 'luxon';
import { PickersDay } from '@mui/x-date-pickers';

export const CalendarHeaderContainer = styled.div`
  display: flex;
  height: 18px;
`;

export const CalendarHeader = styled.div<{ isRed: boolean }>`
  width: 100%;
  height: 100%;
  text-align: center;
  color: ${({ isRed, theme: { Color } }) => (isRed ? '#f44336' : Color.Gray[900])};
  ${({ theme: { Font } }) => Font.Text.xxs.Medium};
`;

export const CalendarContent = styled.div`
  width: 100%;
  height: calc(100% - 18px);
`;

export const CustomPickersDay = styled(PickersDay<DateTime>, {
  shouldForwardProp: (prop: string) => prop !== 'isOutside' && prop !== 'isSunday',
})<{ isOutside: boolean; isSunday: boolean; size: number; backgroundcolor: string }>`
  width: calc(24px * 1.607) !important;
  height: calc(24px * 1.3) !important;
  margin: 6.4px !important;
  background-color: ${({ backgroundcolor }) => backgroundcolor} !important;
  border: 0px !important;
  color: ${({ isOutside, isSunday, theme: { Color } }) =>
    isOutside
      ? isSunday
        ? 'rgba(244, 67, 54, 0.3)'
        : Color.Gray[400]
      : isSunday
      ? '#F44336'
      : Color.Gray[900]} !important;
  &.MuiPickersDay-root {
    ${({ theme: { Font } }) => Font.Text.s.Regular};
    font-weight: 700;
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
