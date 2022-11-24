import { styled } from '@wapl/ui';
import { Moment } from 'moment';
import { PickersDay } from '@mui/x-date-pickers';

export const CalendarPickerWrapper = styled.div`
  .MuiPickersCalendarHeader-root {
    display: none;
  }
`;

export const CustomPickersDay = styled(PickersDay<Moment>, {
  shouldForwardProp: (prop: string) => prop !== 'isOutside' && prop !== 'isSunday',
})<{ isOutside: boolean; isSunday: boolean }>`
  color: ${({ isOutside, isSunday }) =>
    isOutside ? (isSunday ? 'rgba(244, 67, 54, 0.3)' : '#bdc1c6') : isSunday ? '#F44336' : '#202124'} !important;
`;
