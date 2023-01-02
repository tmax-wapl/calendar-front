import { CalendarDTO, CalendarPatchDTO } from '@/common/constants/interfaces';
import { API } from '@/common/lib/API';

export default class CalendarRepo {
  async calendarCreate(dto: CalendarDTO) {
    return await API.post('/apis/v1/calendars/create', dto);
  }

  async getCalendarInfo(calId: number, start: string, end: string) {
    return await API.get<CalendarDTO>(`/apis/v1/calendars/${calId}?start=${start}&end=${end}`);
  }

  async calendarDelete(calId: number) {
    return await API.delete(`/apis/v1/calendars/${calId}`);
  }

  async calendarUpdate(calId: number, dto: CalendarPatchDTO) {
    return await API.patch<CalendarPatchDTO, CalendarDTO>(`/apis/v1/calendars/${calId}`, dto);
  }
}
