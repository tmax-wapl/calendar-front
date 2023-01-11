import { makeObservable, observable, action } from 'mobx';
import RootStore from './RootStore';
import EventRepo from './repository/EventRepo';
import { EventModel } from './model/EventModel';
import { EventDTO } from '@/common/constants/interfaces';
import { EVENT_DELETE_OPTION, EVENT_UPDATE_OPTION } from '@/common/constants';

export default class EventStore {
  rootStore: RootStore;
  repo: EventRepo;
  event: EventModel = new EventModel({});
  eventId: number = null;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.repo = new EventRepo();

    makeObservable(this, {
      event: observable,
      setEvent: action,
      eventId: observable,
    });
  }

  setEvent(event: EventModel) {
    this.event = event;
  }

  async getEventInfo(eventId: number) {
    const res = await this.repo.getEventInfo(eventId);
    return new EventModel(res);
  }

  async getEventList(userId: number, start: string, end: string = start) {
    const eventList = await this.repo.getEventList(userId, start, end);
    return eventList.map(event => new EventModel(event));
  }

  async createEvent(event: EventModel) {
    const res = await this.repo.createEvent(event.dto);
    this.event = new EventModel(res);
    this.eventId = res.id;
    return this.event;
  }

  async updateEvent(eventId: number, { dto }: EventModel, updateOption: EVENT_UPDATE_OPTION) {
    const res = await this.repo.updateEvent(eventId, dto, updateOption);
    this.event = new EventModel(res);
    return this.event;
  }

  async deleteEvent(eventId: number, deleteOption: EVENT_DELETE_OPTION) {
    const res = await this.repo.deleteEvent(eventId, deleteOption);
    return res;
  }

  updateEventColor(id: string, color: string) {
    this.rootStore.calendarStore.eventList = this.rootStore.calendarStore.eventList.map(event => {
      if (event.id === id) event.color = color;
      return event;
    });
  }
}
