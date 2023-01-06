import { EVENT_UPDATE_OPTION } from '@/common/constants';
import { EventDTO } from '@/common/constants/interfaces';
import { API } from '../../common/lib/API';

export default class EventRepo {
  async createEvent(dto: Partial<EventDTO>) {
    try {
      const { response, success } = await API.post<Partial<EventDTO>, EventDTO>(`/apis/v1/event/create`, dto);
      if (success) return response;
    } catch (e) {
      throw Error(JSON.stringify(e));
    }
  }

  async getEventInfo(eventId: number) {
    try {
      const { response, success } = await API.get<EventDTO>(`/apis/v1/event/${eventId}`);
      if (success) return response;
    } catch (e) {
      throw Error(JSON.stringify(e));
    }
  }

  async updateEvent(eventId: number, dto: Partial<EventDTO>, updateOption: EVENT_UPDATE_OPTION) {
    try {
      const { response, success } = await API.patch<Partial<EventDTO>, EventDTO>(
        `/apis/v1/event/update/${eventId}/${updateOption}`,
        dto,
      );
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
