import { EVENT_UPDATE_OPTION } from '@/common/constants';
import { EventDTO, EventListDTO, EventShareDTO, ResponseData } from '@/common/constants/interfaces';
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

  async getEventInfo(eventId: number, date: string) {
    try {
      const {
        data: { response, success },
      } = await API.get<EventDTO, ResponseData<EventDTO>>(`${baseUrl}/apis/v1/event/${eventId}?date=${date}`);
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

  async updateEvent(eventId: number, dto: Partial<EventDTO>, updateOption: EVENT_UPDATE_OPTION, originStart?: string) {
    try {
      const {
        data: { response, success },
      } = await API.patch<Partial<EventDTO>, ResponseData<EventDTO>>(
        `${baseUrl}/apis/v1/event/update/${eventId}/${updateOption}${originStart ? `?date=${originStart}` : ''}`,
        dto,
      );
      if (success) return response;
    } catch (e) {
      if (e instanceof HTTPError) {
      }
      if (e instanceof AxiosError) {
        console.error('allk');
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

  async searchEvent(keyword: string, type: 'T') {
    try {
      const {
        data: { response, success },
      } = await API.get<EventDTO, ResponseData<EventDTO[]>>(
        `${baseUrl}/apis/v1/event/search?type=${type}&text=${keyword}`,
      );
      if (success) return response;
    } catch (e) {
      if (e instanceof HTTPError) {
        throw Error(JSON.stringify(e));
      }
    }
  }
}
