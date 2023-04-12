import { RoomDTO } from '@wapl/core';

export interface EventDTO {
  id: number;
  calId: number;
  roomId?: number;
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
  shareEvent?: boolean;
  eventMember?: EventMember;
  fileList?: AttachmentInfo[];
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
  data: {
    error?: {
      status: number;
      message: string;
    };
    response: T;
    success: boolean;
  };
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
  regDate?: string;
  displayName?: string;
  displayPhoto?: string[];
}

export interface EventMember {
  personaList?: EventMemberPersona[] | { personaId: number }[];
  roomList?: EventMemberRoom[] | { roomId: number }[];
}

export interface EventMemberPersona {
  personaId: number;
  personaNick: string;
}

export interface EventMemberRoom {
  roomId: number;
  roomNick: string;
}

export interface EventListDTO {
  eventList: EventDTO[];
  holidayList: HolidayDTO[];
}

export interface UploadFileDTO {
  roomId: number;
  targetFolderId: number | null;
  userIds: string[];
  roleIds: number[];
  fileSize?: number;
}

export interface FileObject {
  objectId: number;
  deleted: 1; // 1 넣어야한다고 전달받음
  actionId: 202; // docs쪽에서 정한 규칙 같음
}

export interface DeleteFileDTO {
  location: number; // 마이룸 파일일 경우 0, 그 외의 룸일 경우 2
  objectList: FileObject[];
  userId: string;
}

export interface AttachmentInfo {
  docsFileId: number;
  fileName: string;
  fileSize: number;
  fileExtension: 'jpg' | 'pdf' | 'wav' | 'xlsx' | 'mk4' | 'pptx' | 'word' | 'zip' | 'etc';
}
