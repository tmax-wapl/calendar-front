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

export enum EVENT_UPDATE_OPTION {
  DEFAULT = 0, // 일반 일정 수정
  ALL_REPEAT = 1, // 모든 반복일정 수정
  REPEAT_EXCEP = 2, // 반복일정 예외일정 수정
  AFTER_REPEAT_ALL = 3, // 향 후 모든일정 -> (정보 수정)
  AFTER_REPEAT_RRULE = 4, //향 후 모든일정 -> (rrule 수정)
  REPEAT_EXCEP_REMOVE = 5, // 반복 예외일정 삭제
  AFTER_REPEAT_ALL_REMOVE = 6, // 향 후 모든일정 삭제
}
