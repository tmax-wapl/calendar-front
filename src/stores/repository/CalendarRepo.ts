import { CalendarDTO, CalendarPatchDTO, CalendarShareDTO, ResponseData } from '@/common/constants/interfaces';
import { API, baseUrl } from '@/common/lib/API';
import { HTTPError } from '@/error';

export default class CalendarRepo {
  async createCalendar(dto: Partial<CalendarDTO>) {
    try {
      const {
        data: { response },
      } = await API.post<Partial<CalendarDTO>, ResponseData<CalendarDTO>>('${baseUrl}/apis/v1/calendars/create', dto);
      return response;
    } catch (e) {
      if (e instanceof HTTPError) {
        throw e;
      }
    }
  }

  async getCalendarList() {
    try {
      const {
        data: { response, success },
      } = await API.get<CalendarDTO[], ResponseData<CalendarDTO[]>>(`${baseUrl}/apis/v1/user/list/calendar`);
      if (success) return response;
    } catch (e) {
      if (e instanceof HTTPError) {
        throw Error(JSON.stringify(e));
      }
    }
  }

  async getICalendar(calId: number, start: string, end: string) {
    try {
      const {
        data: { response },
      } = await API.get<CalendarDTO, ResponseData<CalendarDTO>>(
        `${baseUrl}/apis/v1/calendars/icalendar/${calId}?start=${start}&end=${end}`,
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
      const {
        data: { response, success },
      } = await API.get<CalendarDTO, ResponseData<CalendarDTO>>(
        `${baseUrl}/apis/v1/calendars/${calId}?start=${start}&end=${end}`,
      );
      if (success) return response;
    } catch (e) {
      if (e instanceof HTTPError) {
        throw Error(JSON.stringify(e));
      }
    }
  }

  async deleteCalendar(calId: number) {
    try {
      const {
        data: { response, success },
      } = await API.delete<CalendarDTO, ResponseData<number>>(`${baseUrl}/apis/v1/calendars/delete/${calId}`);
      if (success) return response;
    } catch (e) {
      if (e instanceof HTTPError) {
        throw Error(JSON.stringify(e));
      }
    }
  }

  async updateCalendar(calId: number, dto: CalendarPatchDTO) {
    try {
      const {
        data: { response, success },
      } = await API.patch<CalendarPatchDTO, ResponseData<CalendarDTO>>(
        `${baseUrl}/apis/v1/calendars/update/${calId}`,
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
      const {
        data: { response },
      } = await API.post<CalendarShareDTO, ResponseData<CalendarShareDTO>>(`${baseUrl}/apis/v1/share/calendar`, dto);
      return response;
    } catch (e) {
      if (e instanceof HTTPError) {
        throw e;
      }
    }
  }
}
