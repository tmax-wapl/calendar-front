export interface EventDTO {
  color: string;
  importance: boolean;
  title: string;
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
