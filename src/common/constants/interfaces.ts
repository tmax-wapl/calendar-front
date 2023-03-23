import { RoomDTO } from '@wapl/core';

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
  alarmList?: string[];
  exceptionList?: ExceptionDTO[];
  location?: string;
  description?: string;
  repeatEndDate?: string;
  repeatStartDate?: string;
  repeatgroupId?: number;
  subEvent?: boolean;
  eventMember?: {
    personaList: EventMemberPersona[];
    roomList: EventMemberRoom[];
  };
  attachments?: any[];
  notifications?: any[];
  exDate?: string;
  exceptionEvent?: boolean;
}

export interface HolidayDTO {
  dateDay: string;
  name: string;
  isRed: boolean;
}

export interface CalendarDTO {
  id: number;
  roomId?: number;
  name: string;
  color: string;
  checkFlag: boolean;
  mainFlag: boolean;
  eventList?: EventDTO[];
  modDate: string;
  modUserId: number;
  regDate: string;
  regUserId: number;
  type?: string;
  url?: string;
  subscribeStatus?: string;
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
  checkFlag?: boolean;
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

export interface ExceptionDTO {
  eventId: number;
  exceptionDate: number[];
  isRemove: string;
}

// response data 명시 해주기로..
export interface ResponseData<T> {
  error?: {
    status: number;
    message: string;
  };
  response: T;
  success: boolean;
}
export interface CalendarShareDTO {
  calendarId: number;
  personaIdList?: number[];
  roomIdList?: number[];
}

export interface EventShareDTO {
  eventId: number;
  personaIdList?: number[];
  roomIdList?: number[];
}

export interface CustomRoomDTO extends RoomDTO.Room {
  checked?: boolean;
  disabled?: boolean;
  displayName?: string;
  displayPhoto?: string[];
}

export interface EventMember {
  personaList?: EventMemberPersona[];
  roomList?: EventMemberRoom[];
}

export interface EventMemberPersona {
  personaId: number;
  personaNick: string;
}

export interface EventMemberRoom {
  roomId: number;
  roomNick: string;
}
