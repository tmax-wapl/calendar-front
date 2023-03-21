import { CalendarDTO, CalendarPatchDTO, CalendarShareDTO } from '@/common/constants/interfaces';
import { API } from '@/common/lib/API';
import { HTTPError } from '@/error';

export default class CalendarRepo {
  async createCalendar(dto: Partial<CalendarDTO>) {
    try {
      const { response } = await API.post<Partial<CalendarDTO>, CalendarDTO>('/apis/v1/calendars/create', dto);
      return response;
    } catch (e) {
      if (e instanceof HTTPError) {
        throw e;
      }
    }
  }

  async getCalendarList(userId: number) {
    try {
      const { response, success } = await API.get<CalendarDTO[]>(`/apis/v1/user/list/calendar/${userId}`);
      if (success) return response;
    } catch (e) {
      if (e instanceof HTTPError) {
        throw Error(JSON.stringify(e));
      }
    }
  }

  async getICalendar(calId: number, start: string, end: string) {
    try {
      const { response } = await API.get<CalendarDTO>(
        `/apis/v1/calendars/icalendar/${calId}?start=${start}&end=${end}`,
      );
      return response;
    } catch (e) {
      if (e instanceof HTTPError) {
        throw e;
      }
    }
  }

  async getCalendarInfo(calId: number, start: string, end: string) {
    try {
      const { response, success } = await API.get<CalendarDTO>(`/apis/v1/calendars/${calId}?start=${start}&end=${end}`);
      if (success) return response;
    } catch (e) {
      if (e instanceof HTTPError) {
        throw Error(JSON.stringify(e));
      }
    }
  }

  async deleteCalendar(calId: number) {
    try {
      const { response, success } = await API.delete(`/apis/v1/calendars/delete/${calId}`);
      if (success) return response;
    } catch (e) {
      if (e instanceof HTTPError) {
        throw Error(JSON.stringify(e));
      }
    }
  }

  async updateCalendar(calId: number, dto: CalendarPatchDTO) {
    try {
      const { response, success } = await API.patch<CalendarPatchDTO, CalendarDTO>(
        `/apis/v1/calendars/update/${calId}`,
        dto,
      );
      if (success) return response;
    } catch (e) {
      if (e instanceof HTTPError) {
        throw Error(JSON.stringify(e));
      }
    }
  }

  async shareCalendar(dto: CalendarShareDTO) {
    try {
      const { response } = await API.post<CalendarShareDTO, number[]>(`/apis/v1/share/calendar`, dto);
      return response;
    } catch (e) {
      if (e instanceof HTTPError) {
        throw e;
      }
    }
  }
}
