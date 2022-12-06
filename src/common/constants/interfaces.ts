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
  startTime: DateTime;
  endDate: DateTime;
  endTime: DateTime;
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
