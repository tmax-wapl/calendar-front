import { styled } from '@wapl/ui';
import { Moment } from 'moment';
import { PickersDay } from '@mui/x-date-pickers';

export const YearPickerWrapper = styled.div<{ size: number; backgroundColor: string }>`
  // 년도 선택 height 조정
  .MuiYearPicker-root {
    max-height: calc(256px * ${({ size }) => size});
    // 스크롤 안보이게 숨기기
    ::-webkit-scrollbar {
      display: none;
    }
    padding: 0px;
    gap: calc(14px * ${({ size }) => size}) calc(13px * ${({ size }) => size});
  }

  // 년도 칸 크기 조정 및 버튼 컬러 수정
  .PrivatePickersYear-root,
  .PrivatePickersYear-yearButton {
    flex-basis: 0%;
    width: calc(60px * ${({ size }) => size}) !important;
    height: calc(40px * ${({ size }) => size}) !important;
  }
  .PrivatePickersYear-yearButton {
    font-size: 12px;
    font-weight: 700;
    margin: 0px;
    &,
    &.Mui-selected {
      color: #000000;
      background-color: ${({ backgroundColor }) => backgroundColor};
      :hover,
      :active,
      :focus {
        background-color: ${({ backgroundColor }) => backgroundColor};
      }
    }
  }
`;

export const MonthPickerWrapper = styled.div<{ size: number; backgroundColor: string }>`
  // 월 선택 width 조정
  .MuiMonthPicker-root {
    width: calc(280px * ${({ size }) => size});
    margin: 0px 0px 4px 0px;
    gap: calc(36px * ${({ size }) => size}) calc(13px * ${({ size }) => size});
  }

  // 월 선택 칸 크기 조정
  .PrivatePickersMonth-root {
    width: calc(60px * ${({ size }) => size}) !important;
    height: calc(60px * ${({ size }) => size}) !important;
    font-size: 12px;
    font-weight: 700;
    margin: 0px;
    flex: none;
    &,
    &.Mui-selected {
      color: #000000;
      background-color: ${({ backgroundColor }) => backgroundColor};
      :hover,
      :active,
      :focus {
        background-color: ${({ backgroundColor }) => backgroundColor};
      }
    }
  }
`;

export const CalendarPickerWrapper = styled.div<{ size: number; backgroundColor: string }>`
  .MuiCalendarPicker-root {
    width: 100%;
  }

  .MuiPickersCalendarHeader-root {
    display: none;
  }

  .PrivatePickersSlideTransition-root {
    min-height: calc(240px * ${({ size }) => size});
  }

  // 일~토 label
  .MuiDayPicker-weekDayLabel {
    height: calc(16px * ${({ size }) => size});
    font-size: 11px;
    color: #202124;
    :first-of-type {
      color: #f44336;
    }
  }

  // 날짜 칸 조정
  .MuiDayPicker-weekContainer {
    margin: 0px;
  }
  .MuiPickersDay-root {
    height: calc(24px * ${({ size }) => size});
    margin: calc(8px * ${({ size }) => size});
    font-weight: 700 !important;
    background-color: ${({ backgroundColor }) => backgroundColor};
    border: 0px !important;
    // 년도, 월 선택을 통해 다른 달로 이동 시, selected 컬러 변경
    &.Mui-selected {
      background-color: rgba(0, 0, 0, 0.06) !important;
    }
    // 오늘 날짜 컬러 변경
    &.MuiPickersDay-today {
      background-color: #ff6258 !important;
      color: white !important;
    }
  }
`;

export const CustomPickersDay = styled(PickersDay<Moment>, {
  shouldForwardProp: (prop: string) => prop !== 'isOutside' && prop !== 'isSunday',
})<{ isOutside: boolean; isSunday: boolean }>`
  color: ${({ isOutside, isSunday }) =>
    isOutside ? (isSunday ? 'rgba(244, 67, 54, 0.3)' : '#bdc1c6') : isSunday ? '#F44336' : '#202124'} !important;
`;
