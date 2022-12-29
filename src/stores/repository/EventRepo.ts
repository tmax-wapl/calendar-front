import { EventDTO } from '@/common/constants/interfaces';
import { API } from '../../common/lib/API';

export default class EventRepo {
  async getEventList(appId: string, calendarId: string): Promise<any> {
    try {
      const { response, success } = await API.get(`/apis/v1/apps/${appId}/calendars/${calendarId}/events`);
      if (success) return response;
    } catch (e) {
      throw Error(JSON.stringify(e));
    }
  }

  async getEventInfo(eventId: number) {
    try {
      const { response, success } = await API.get(`/apis/v1/event/${eventId}`);
      if (success) return response;
    } catch (e) {
      throw Error(JSON.stringify(e));
    }
  }

  async createEvent(dto: EventDTO) {
    try {
      const { response, success } = await API.post(`/apis/v1/event/create`, dto);
      if (success) return response;
    } catch (e) {
      throw Error(JSON.stringify(e));
    }
  }

  async getEventRange(calId: number, start: Date, end: Date) {
    try {
      const { response, success } = await API.get(`/apis/v1/event/list/calendars/${calId}?start=${start}&end=${end}`);
      if (success) return response;
    } catch (e) {
      throw Error(JSON.stringify(e));
    }
  }

  async updateEvent(eventId: number, dto: EventDTO) {
    try {
      const { response, success } = await API.patch(`/apis/v1/event/update/${eventId}`, dto);
      if (success) return response;
    } catch (e) {
      throw Error(JSON.stringify(e));
    }
  }

  async deleteEvent(eventId: number) {
    try {
      const { response, success } = await API.delete(`/apis/v1/event/delete/${eventId}`);
      if (success) return response;
    } catch (e) {
      throw Error(JSON.stringify(e));
    }
  }
}
