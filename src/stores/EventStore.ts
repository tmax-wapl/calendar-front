import RootStore from './RootStore';
import EventRepo from './repository/EventRepo';
import { EventDTO } from '@/common/constants/interfaces';
import { makeObservable, observable } from 'mobx';

export default class EventStore {
  rootStore: RootStore;
  repo: EventRepo;
  eventId: number = null;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.repo = new EventRepo();
    makeObservable(this, {
      eventId: observable,
    });
  }

  async getEventInfo(eventId: number) {
    const res = await this.repo.getEventInfo(eventId);
    return res;
  }

  async createEvent(dto: EventDTO) {
    const res = await this.repo.createEvent(dto);
    return res;
  }

  async updateEvent(eventId: number, dto: EventDTO) {
    const res = await this.repo.updateEvent(eventId, dto);
    return res;
  }
  async deleteEvent(eventId: number) {
    const res = await this.repo.deleteEvent(eventId);
    return res;
  }
}
