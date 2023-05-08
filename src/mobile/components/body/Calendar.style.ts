import { styled } from '@wapl/ui';

export const CalendarContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  .fc {
    // 풀캘린더 전체
    //border-bottom: solid 1px #eeeeee;
    width: 100%;
    height: 100%;
  }
  .fc-header-toolbar {
    display: none;
  }
  .fc-scrollgrid {
    // 풀캘린더 전체 스크롤틀
    border: none;
  }
  /* .fc-view:not(.fc-timegrid) .fc-col-header-cell-cushion {
    height: 1.813rem;
    padding: 0px;
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 1.813rem;
    color: rgb(51, 51, 51);
    cursor: default;
  } */
  .fc-theme-standard .fc-daygrid tr {
    // 월 보기모드 header row & week row
    border-bottom: 1px solid #e8eaed;
  }
  .fc-theme-standard th {
    // 모든 보기모드 header cell
    border: none;
  }
  .fc-theme-standard .fc-daygrid td {
    // 월 보기모드 week cell
    border: 0px solid #e8eaed;
  }
  .fc-theme-standard .fc-daygrid td:first-of-type {
    // 월 보기모드 week cell
    border-left: none;
    border-bottom: none;
  }
  .fc-theme-standard .fc-daygrid td:last-of-type {
    // 월 보기모드 week cell
    border-right: none;
  }

  .fc-scrollgrid table {
    border-bottom-style: 1px solid #e8eaed;
    transition: height 0.5s ease;
  }
  .fc-col-header-cell-cushion {
    display: flex;
    ${({ theme: { Font } }) => Font.Text.xs.Bold};
    padding-bottom: 3px;
    justify-content: center;
  }

  .fc-timegrid .fc-col-header-cell-cushion {
    display: flex;
    ${({ theme: { Font } }) => Font.Text.xs.Bold};
    padding: 12px 6px 7px 8px;
  }

  .fc-daygrid-day-bottom {
    ${({ theme: { Font } }) => Font.Text.xxxxs.Medium};
  }

  .fc-daygrid-day-number {
    padding: 0px;
    ${({ theme: { Font } }) => Font.Text.xxs.Medium};
  }
  .fc-timegrid-divider {
    // 주/일 보기모드 종일/시간영역 분리자
    display: none;
  }
  .fc-daygrid-day-frame {
    min-height: 46px;
    height: 100%;
  }

  .fc-daygrid-day-events {
    margin-top: 5px;
  }
  .fc-daygrid.fc-view {
    // 월 보기모드
    .fc-daygrid-day-top {
      // 월 보기모드 날짜 영역
      display: flex;
      justify-content: center;
      margin-top: 8px;
    }
    .fc-day-today {
      // 오늘 daygrid
      background: inherit;
      .fc-daygrid-day-top {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 22px;
        height: 22px;
        background-color: ${({ theme: { Color } }) => Color.Scarlet[500]};
        border-radius: 15px;
        margin: auto;
        margin-top: 5px;
      }
      .fc-daygrid-day-events {
        margin-top: 0px;
      }

      .fc-daygrid-day-number {
        color: white;
      }
      .MuiBox-root {
        // 날짜 숫자 박스
        position: relative;
        top: -3px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        //background-color: #ff6258;
        color: white;
      }
    }
    .fc-scroller {
      overflow: hidden !important;
    }
  }
  .fc-timegrid-axis-frame {
    justify-content: center;
  }

  .fc-day-sun {
    .fc-daygrid-day-number,
    .fc-col-header-cell-cushion {
      color: red;
    }
  }

  .fc-daygrid-day {
    .fc-highlight {
      background: ${({ theme: { Color } }) => Color.Gray[100]};
      z-index: -1;
    }
  }

  .fc-timeGridWeek-view {
    tr.fc-scrollgrid-section:first-of-type {
      .fc-daygrid-day-top {
        display: none;
      }
      .fc-daygrid-day-events {
        margin: 8px 0;
      }
      .fc-scroller {
        max-height: 165px;
      }
    }
  }

  .fc-scrollgrid-section-liquid {
    .fc-timegrid-event-harness {
      min-height: 20px;
    }
  }

  .fc-timegrid.fc-view {
    // 주/일 보기모드
    // 1. 요일영역
    // 2. 종일영역
    // 2-1. 종일텍스트영역
    // 2-2. 종일일정영역
    // 3. 시간영역
    // 3-1. 시간텍스트영역 (오전1시, 오전2시, etc)
    // 3-2. 시간일정영역
    .fc-timegrid-slot {
      height: 30px;
    }
    .fc-timegrid-slot-label {
      // 시간텍스트영역 cell (오전1시)
      border-top: none;
    }
    .fc-timegrid-slot-minor {
      // 30분 단위 시간일정영역 cell
      border: none;
    }
    .fc-scrollgrid-shrink-cushion {
      // 시간텍스트영역 cell 폰트
      font-style: normal;
      ${({ theme: { Font } }) => Font.Text.xxs.Regular}
    }
    .fc-timegrid-slot-label-cushion {
      // 시간텍스트영역 cell wrapper
      position: relative;
      top: -14px;
      padding: 0 10px 0 0;
    }
    [data-time='00:00:00'] .fc-timegrid-slot-label-cushion {
      // 오전12시 시간텍스트영역 cell wrapper
      display: none;
    }
    .fc-timegrid-now-indicator-arrow {
      // 현재 시간대영역 표시 화살표
      display: none;
    }
    .fc-timegrid-now-indicator-container {
      overflow: visible;
    }
    .fc-timegrid-now-indicator-line {
      // 현재 시간일정영역 표시 선
      border-color: ${({ theme: { Color } }) => Color.Gray[900]};
      border-width: 1px 0px 0px;
      height: 1px;
      &::after {
        content: '';
        position: absolute;
        width: 7px;
        height: 7px;
        margin: 0;
        vertical-align: middle;
        background: ${({ theme: { Color } }) => Color.Gray[900]};
        border-radius: 50%;
        top: -4px;
        left: -4px;
      }
    }
    .fc-day-today .MuiBox-root {
      // 오늘 요일영역 날짜숫자 박스
      position: relative;
      top: -5px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background-color: ${({ theme: { Color } }) => Color.Scarlet[500]};
      color: white;
    }
    .fc-daygrid-day.fc-day-today {
      // 오늘 종일일정영역 cell
      background-color: ${({ theme: { Color } }) => Color.Gray[50]};
    }
    .fc-timegrid-col.fc-day-today {
      // 오늘 시간일정영역 cell
      background-color: ${({ theme: { Color } }) => Color.Gray[50]};
    }
    .fc-timegrid-event .fc-event-main {
      padding: 0;
    }
  }

  .fc-h-event {
    // 가로로 그려지는 일정 (월 보기모드 일정, 주/일 보기모드 종일 일정) 테두리
    border: none;
    background-color: transparent;
  }

  .fc-v-event {
    // 세로로 그려지는 일정 (주/일 보기모드 시간 일정) 테두리
    border: none;
    background-color: transparent;
  }
  .fc-col-header,
  .fc-daygrid-body,
  .fc-scrollgrid-sync-table {
    width: 100% !important;
  }
  .fc-daygrid-body-unbalanced .fc-daygrid-day-events {
    min-height: unset !important;
    pointer-events: none;
  }
  .fc-view-harness {
    height: 150px;
  }

  .fc-daygrid-body tr {
    height: 16.6666%;
  }
  .fc-daygrid-more-link {
    float: right;
  }
  .fc-more-popover {
    visibility: hidden;
  }
`;

export const FullCalendarWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 0 8px;
  border-right: 1px solid #eeeeee;
`;

export const AllDayWrapper = styled.div`
  display: flex;
`;

export const AllDayText = styled.span`
  margin-right: 5px;
`;

export const ArrowButton = styled.div<{ isTop: boolean }>`
  display: flex;
  width: 8px;
  height: 8px;
  align-items: center;
  justify-content: center;
  &:hover {
    cursor: pointer;
  }
  &::after {
    content: '';
    display: flex;
    align-items: center;
    justify-content: center;
    width: 8px;
    height: 8px;
    border-top: 0.1rem solid ${({ theme: { Color } }) => Color.Gray[900]};
    border-right: 0.1rem solid ${({ theme: { Color } }) => Color.Gray[900]};
    margin-top: ${({ isTop }) => (isTop ? '7px;' : '0px;')};
    transform: ${({ isTop }) => (isTop ? 'rotate(-45deg);' : 'rotate(135deg);')};
  }
`;

export const EventWrapper = styled.span<{ isHalfLess: boolean }>`
  display: flex;
  align-items: center;
  padding: ${({ isHalfLess }) => (isHalfLess ? '0px 10px 0 8px' : '4px 8px')};
  &:hover {
    cursor: pointer;
  }
`;

export const WeekEventWrapper = styled(EventWrapper)`
  flex-direction: column;
  align-items: normal;
  height: 100%;
  padding: ${({ isHalfLess }) => (isHalfLess ? '1px 10px 1px 8px' : '4px 8px')};
`;

export const CalendarColor = styled.span<{ color: string }>`
  position: absolute;
  width: 4px;
  height: 100%;
  background: ${({ color }) => color};
  border-radius: 3px 0 0 3px;
`;

export const EventSpan = styled.span`
  display: flex;
`;

export const EventTitle = styled.span<{ isHalfLess: boolean }>`
  display: ${({ isHalfLess }) => (isHalfLess ? 'inline' : '-webkit-box')};
  ${({ theme: { Font } }) => Font.Text.xxxs.Regular};
  overflow: hidden;
  text-overflow: ellipsis;
  ${({ isHalfLess }) =>
    isHalfLess
      ? 'white-space: pre;'
      : `-webkit-line-clamp: 2; 
    word-break: break-word; 
    -webkit-box-orient: vertical;`};
`;

export const WeekDayHeader = styled.span<{ color: string }>`
  color: ${({ color }) => color};
  display: flex;
  width: 100%;
  align-items: center;
`;

export const Today = styled.span`
  width: 20px;
  height: 20px;
  ${({ theme: { Font } }) => Font.Text.s.Bold};
  line-height: 17px;
  background: ${({ theme: { Color } }) => Color.Scarlet[500]};
  color: white;
  border-radius: 15px;
  margin-right: 4px;
`;
