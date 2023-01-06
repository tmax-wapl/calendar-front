export interface EventDTO {
  id: number;
  calId: number;
  calName: string;
  calColor: string;
  color: string;
  importance: boolean;
  title: string;
  allDay: boolean;
  start: string;
  end: string;
  modDate?: string;
  modUserId?: number;
  regDate?: string;
  regUserId?: number;
  rrule?: string;
  alarmList?: AlarmDTO[];
  exceptionList?: ExceptionDTO[];
  location?: string;
  description?: string;
  repeatEndDate?: string;
  repeatStartDate?: string;
  repeatgroupId?: number;
  participants?: any[];
  attachments?: any[];
  notifications?: any[];
}

export interface CalendarDTO {
  color: string;
  eventList?: EventDTO[];
  id: number;
  modDate: string;
  modUserId: number;
  name: string;
  regDate: string;
  regUserId: number;
  type?: string;
  url?: string;
}

export interface CalendarPersonaDTO {
  userId: number;
  calId: number;
  isMain: boolean;
  nickname: string;
  color: string;
  isVisible: boolean;
  calendarList?: CalendarDTO[];
}

export interface CalendarPatchDTO {
  userId: number;
  name?: string;
  color?: string;
}

export interface EventRangeDTO {
  allDay: string;
  calId: number;
  calName: string;
  calColor: string;
  color: string;
  endDate: string;
  id: number;
  importance: string;
  name: string;
  repeatEndDate: string;
  repeatStartDate: string;
  repeatgroupId: number;
  rrule: string;
  startDate: string;
  display?: string;
}

export interface EventSharePersonaDTO {
  toUserId: number;
  eventId: number;
  permission: string;
  fromUserId: number;
  type: string;
  modUserId: string;
  roomId: string;
  shareEventList?: EventDTO[];
}

export interface AlarmDTO {
  endDate: string;
  eventId: number;
  id: number;
  onGoing: string;
  startDate: string;
  time: string;
  timestamp: string;
  userTime: string;
}

export interface ExceptionDTO {
  eventId: number;
  exceptionDate: string;
  isRemove: string;
}

// response data 명시 해주기로..
export interface ResponseData<T = any> {
  error?: {
    status: number;
    message: string;
  };
  response: T;
  success: boolean;
}
