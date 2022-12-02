import { styled } from '@wapl/ui';
import { DateTime } from 'luxon';
import { PickersDay } from '@mui/x-date-pickers';

export const CalendarHeaderContainer = styled.div<{ size: number }>`
  height: calc(16px * ${({ size }) => size});
  display: flex;
`;

export const CalendarHeader = styled.div<{ isRed: boolean }>`
  width: 100%;
  height: 100%;
  font-size: 11px;
  text-align: center;
  color: ${({ isRed }) => (isRed ? '#f44336' : '#202124')};
`;

export const CalendarContent = styled.div<{ size: number }>`
  width: 100%;
  height: calc(240px * ${({ size }) => size});
`;

export const CustomPickersDay = styled(PickersDay<DateTime>, {
  shouldForwardProp: (prop: string) => prop !== 'isOutside' && prop !== 'isSunday',
})<{ isOutside: boolean; isSunday: boolean; size: number; backgroundcolor: string }>`
  width: calc(24px * ${({ size }) => size}) !important;
  height: calc(24px * ${({ size }) => size}) !important;
  margin: calc(8px * ${({ size }) => size}) !important;
  background-color: ${({ backgroundcolor }) => backgroundcolor} !important;
  font-weight: 700 !important;
  border: 0px !important;
  color: ${({ isOutside, isSunday }) =>
    isOutside ? (isSunday ? 'rgba(244, 67, 54, 0.3)' : '#bdc1c6') : isSunday ? '#F44336' : '#202124'} !important;
  &.Mui-selected {
    background-color: rgba(0, 0, 0, 0.06) !important;
  }
  &.MuiPickersDay-today {
    background-color: #ff6258 !important;
    color: white !important;
  }
`;
