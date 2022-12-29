import RootStore from './RootStore';
import EventRepo from './repository/EventRepo';
import { EventDTO } from '@/common/constants/interfaces';

export default class EventStore {
  rootStore: RootStore;
  repo: EventRepo;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.repo = new EventRepo();
  }

  async getEventList(appId: string, calendarId: string) {
    const res = await this.repo.getEventList(appId, calendarId);
    return res;
  }

  async getEventInfo(eventId: number) {
    const res = await this.repo.getEventInfo(eventId);
    return res;
  }

  async createEvent(dto: EventDTO) {
    const res = await this.repo.createEvent(dto);
    return res;
  }
}
