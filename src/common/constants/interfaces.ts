import { DateTime } from 'luxon';

export interface EventDTO {
  color: string;
  importance: boolean;
  title: string;
  allDay: boolean;
  start: string;
  end: string;
  time: string;
  repeat?: string;
  endDate?: string;
  calendarName: string;
  creator?: string;
  participants?: any[];
  location?: string;
  notifications?: any[];
  description?: string;
  attachments?: any[];
}

export interface EventModel {
  importance: boolean;
  title: string;
  allDay: boolean;
  startDate: DateTime;
  endDate: DateTime;
  repeatTime: string;
  repeatUnit: string;
  repeatEndDate: DateTime;
  repeatDays: boolean[];
  color: string;
  participants: any[];
  location: string;
  notifications: any[];
  description: string;
  attachments: any[];
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

// response data 명시 해주기로..
export interface ResponseData<T = any> {
  error?: {
    status: number;
    message: string;
  };
  response: T;
  success: boolean;
}
