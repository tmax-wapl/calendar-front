import { EVENT_UPDATE_OPTION } from '@/common/constants';
import { EventDTO, HolidayDTO } from '@/common/constants/interfaces';
import { HTTPError } from '@/error';
import { AxiosError } from 'axios';
import { API } from '../../common/lib/API';

export default class EventRepo {
  async createEvent(dto: Partial<EventDTO>) {
    try {
      const { response, success } = await API.post<Partial<EventDTO>, EventDTO>(`/apis/v1/event/create`, dto);
      if (success) return response;
    } catch (e) {
      if (e instanceof HTTPError) {
        throw Error(JSON.stringify(e));
      }
    }
  }

  async getEventInfo(eventId: number, date: string) {
    try {
      const { response, success } = await API.get<EventDTO>(`/apis/v1/event/${eventId}?date=${date}`);
      if (success) return response;
    } catch (e) {
      if (e instanceof HTTPError) {
        throw Error(JSON.stringify(e));
      }
    }
  }

  async getEventList(userId: number, start: string, end: string) {
    try {
      const { response, success } = await API.get<{ eventList: EventDTO[]; holidayList: HolidayDTO[] }>(
        `/apis/v1/user/list/event/holiday/${userId}?start=${start}&end=${end}`,
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
      const { response, success } = await API.patch<Partial<EventDTO>, EventDTO>(
        `/apis/v1/event/update/${eventId}/${updateOption}${originStart ? `?date=${originStart}` : ''}`,
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
      const { response, success } = await API.delete(`/apis/v1/event/delete/${eventId}`);
      if (success) return response;
    } catch (e) {
      if (e instanceof HTTPError) {
        throw Error(JSON.stringify(e));
      }
    }
  }
}
