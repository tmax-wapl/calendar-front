import { styled } from '@wapl/ui';
import { DateTime } from 'luxon';
import { PickersDay } from '@mui/x-date-pickers';

export const CalendarHeader = styled.div<{ isRed: boolean }>`
  width: 40px;
  height: 16px;
  display: inline-block;
  font-size: 11px;
  text-align: center;
  color: ${({ isRed }) => (isRed ? '#f44336' : '#202124')};
`;

export const CalendarContent = styled.div`
  width: 280px;
  height: 240px;
`;

export const CustomPickersDay = styled(PickersDay<DateTime>, {
  shouldForwardProp: (prop: string) => prop !== 'isOutside' && prop !== 'isSunday',
})<{ isOutside: boolean; isSunday: boolean }>`
  color: ${({ isOutside, isSunday }) =>
    isOutside ? (isSunday ? 'rgba(244, 67, 54, 0.3)' : '#bdc1c6') : isSunday ? '#F44336' : '#202124'} !important;
`;
