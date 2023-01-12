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

export enum EVENT_DELETE_OPTION {
  DEFAULT = 0, // 일반 일정 및 모든 일정 삭제,
}
