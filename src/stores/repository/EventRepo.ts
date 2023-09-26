import { EVENT_UPDATE_OPTION } from '@/common/constants';
import { EventDTO, EventListDTO, EventShareDTO, EventSearchDTO, ResponseData } from '@/common/constants/interfaces';
import { HTTPError } from '@/error';
import { AxiosError } from 'axios';
import { API, baseUrl } from '../../common/lib/API';

export default class EventRepo {
  async createEvent(dto: Partial<EventDTO>) {
    try {
      const {
        data: { response, success },
      } = await API.post<Partial<EventDTO>, ResponseData<EventDTO>>(`${baseUrl}/apis/v1/event/create`, dto);
      if (success) return response;
    } catch (e) {
      if (e instanceof HTTPError) {
        throw Error(JSON.stringify(e));
      }
    }
  }

  async getEventInfo(eventId: number, date: string, roomId?: number) {
    try {
      const {
        data: { response, success },
      } = await API.get<EventDTO, ResponseData<EventDTO>>(
        `${baseUrl}/apis/v1/event/${eventId}${roomId ? `?roomId=${roomId}&` : '?'}date=${date}`,
      );
      if (success) return response;
    } catch (e) {
      if (e instanceof HTTPError) {
        throw Error(JSON.stringify(e));
      }
    }
  }

  async getEventList(start: string, end: string) {
    try {
      const {
        data: { response, success },
      } = await API.get<EventListDTO, ResponseData<EventListDTO>>(
        `${baseUrl}/apis/v1/user/list/event/holiday?start=${start}&end=${end}`,
      );
      if (success) return response;
    } catch (e) {
      if (e instanceof HTTPError) {
        throw Error(JSON.stringify(e));
      }
    }
  }

  async updateEvent(
    eventId: number,
    dto: Partial<EventDTO>,
    updateOption: EVENT_UPDATE_OPTION,
    originStart?: string,
    isDrag = false,
  ) {
    try {
      const {
        data: { response, success },
      } = await API.patch<Partial<EventDTO>, ResponseData<EventDTO>>(
        `${baseUrl}/apis/v1/event/update/${eventId}/${updateOption}${originStart ? `?date=${originStart}` : ''}${
          isDrag ? (originStart ? '&isDrag=true' : '?isDrag=true') : ''
        }`,
        dto,
      );
      if (success) return response;
    } catch (e) {
      if (e instanceof HTTPError) {
      }
      if (e instanceof AxiosError) {
        throw Error(JSON.stringify(e));
      }
    }
  }

  async updateEventColor(eventId: number, dto: Partial<EventDTO>) {
    try {
      const {
        data: { response, success },
      } = await API.patch<Partial<EventDTO>, ResponseData<EventDTO>>(
        `${baseUrl}/apis/v1/event/update/color/${eventId}`,
        dto,
      );
      if (success) return response;
    } catch (e) {
      if (e instanceof HTTPError) {
        throw Error(JSON.stringify(e));
      }
    }
  }

  async deleteEvent(eventId: number) {
    try {
      const {
        data: { response, success },
      } = await API.delete<EventDTO, ResponseData<EventDTO>>(`${baseUrl}/apis/v1/event/delete/${eventId}`);
      if (success) return response;
    } catch (e) {
      if (e instanceof HTTPError) {
        throw Error(JSON.stringify(e));
      }
    }
  }
  async shareEvent(dto: EventShareDTO) {
    try {
      const {
        data: { response, success },
      } = await API.post<EventShareDTO, ResponseData<EventDTO>>(`${baseUrl}/apis/v1/share/event`, dto);
      if (success) return response;
    } catch (e) {
      if (e instanceof HTTPError) {
        throw Error(JSON.stringify(e));
      }
    }
  }

  async searchEvent(keyword: string, type: 'T', page = 0, size = 100) {
    try {
      const {
        data: { response, success },
      } = await API.get<EventDTO, ResponseData<EventSearchDTO>>(
        `${baseUrl}/apis/v1/event/search?page=${page}&size=${size}&type=${type}&text=${encodeURIComponent(keyword)}`,
      );
      if (success) return response;
    } catch (e) {
      if (e instanceof HTTPError) {
        throw Error(JSON.stringify(e));
      }
    }
  }
}
