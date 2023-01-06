import { CalendarDTO, CalendarPatchDTO } from '@/common/constants/interfaces';
import { API } from '@/common/lib/API';

export default class CalendarRepo {
  async calendarCreate(dto: CalendarDTO) {
    try {
      const { response, success } = await API.post('/apis/v1/calendars/create', dto);
      if (success) return response;
    } catch (e) {
      throw Error(JSON.stringify(e));
    }
  }

  async getCalendarList(userId: number, start: string, end: string) {
    try {
      const { response, success } = await API.get<CalendarDTO[]>(`/apis/v1/user/${userId}?start=${start}&end=${end}`);
      if (success) return response;
    } catch (e) {
      throw Error(JSON.stringify(e));
    }
  }

  async getCalendarInfo(calId: number, start: string, end: string) {
    try {
      const { response, success } = await API.get<CalendarDTO>(`/apis/v1/calendars/${calId}?start=${start}&end=${end}`);
      if (success) return response;
    } catch (e) {
      throw Error(JSON.stringify(e));
    }
  }

  async calendarDelete(calId: number) {
    try {
      const { response, success } = await API.delete(`/apis/v1/calendars/${calId}`);
      if (success) return response;
    } catch (e) {
      throw Error(JSON.stringify(e));
    }
  }

  async calendarUpdate(calId: number, dto: CalendarPatchDTO) {
    try {
      const { response, success } = await API.patch<CalendarPatchDTO, CalendarDTO>(
        `/apis/v1/calendars/update/${calId}`,
        dto,
      );
      if (success) return response;
    } catch (e) {
      throw Error(JSON.stringify(e));
    }
  }
}
