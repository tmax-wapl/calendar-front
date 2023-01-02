import { EventDTO } from '@/common/constants/interfaces';
import { API } from '../../common/lib/API';

export default class EventRepo {
  async createEvent(dto: EventDTO) {
    return await API.post<EventDTO, EventDTO>(`/apis/v1/event/create`, dto);
  }

  async getEventInfo(eventId: number) {
    return await API.get<EventDTO>(`/apis/v1/event/${eventId}`);
  }

  async updateEvent(eventId: number, dto: EventDTO) {
    return await API.patch<EventDTO, EventDTO>(`/apis/v1/event/update/${eventId}`, dto);
  }

  async deleteEvent(eventId: number) {
    return await API.delete(`/apis/v1/event/delete/${eventId}`);
  }
}
