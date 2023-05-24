export enum MODE {
  FULL = 'full',
  MODULE = 'module',
}

export enum DATE_EVENT {
  PREV = 'prev',
  NEXT = 'next',
  TODAY = 'today',
}

export enum VIEW_MODE {
  MONTH = 'dayGridMonth',
  WEEK = 'timeGridWeek',
  DAY = 'timeGridDay',
}

export enum EVENT_UPDATE_OPTION { // TODO: UPDATE 타입 통합 예정
  DEFAULT = 0, // 일반 일정 수정
  ONCE_REPEAT_EVENT = 1, // 이 일정만 수정
  AFTER_REPEAT_EVENT = 2, // 이 일정 및 향 후 모든일정
  ALL_REPEAT_EVENT = 3, // 모든 일정
  ONCE_REPEAT_EVENT_EXCEPT = 4, // 반복 예외 일정
  AFTER_REPEAT_EVENT_EXCEPT = 5, // 이 일정 및 향 후 모든 일정 예외
}

export const ERROR_STATUS: { [key: number]: string } = {
  401: '로그인이 필요합니다.',
  403: '권한이 필요합니다.',
  404: '리소스를 찾을 수 없습니다.',
  500: '서버에 문제가 발생하였습니다.',
};

export enum APP_ID {
  CALENDAR = 4,
  OFFICE = 21,
}

export const ColorItem = [
  { value: '', color: '', label: '선택 없음' },
  { value: '#3384FF', color: '#3384FF', label: '파랑' },
  { value: '#383FCA', color: '#383FCA', label: '남색' },
  { value: '#00C064', color: '#00C064', label: '초록' },
  { value: '#00C1B1', color: '#00C1B1', label: '민트' },
  { value: '#AECB00', color: '#AECB00', label: '연두' },
  { value: '#FFCF55', color: '#FFCF55', label: '노랑' },
  { value: '#FF8E3D', color: '#FF8E3D', label: '주황' },
  { value: '#FF46B5', color: '#FF46B5', label: '분홍' },
  { value: '#FF5154', color: '#FF5154', label: '빨강' },
  { value: '#A143FF', color: '#A143FF', label: '보라' },
];

export const NotificationItems = [
  { label: '일정 당시', value: '0' },
  { label: '5분 전', value: '5 m' },
  { label: '10분 전', value: '10 m' },
  { label: '15분 전', value: '15 m' },
  { label: '30분 전', value: '30 m' },
  { label: '1시간 전', value: '1 h' },
  { label: '2시간 전', value: '2 h' },
  { label: '1일 전', value: '1 d' },
  { label: '2일 전', value: '2 d' },
];
