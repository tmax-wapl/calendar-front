import { makeObservable, observable, action } from 'mobx';
import RootStore from './RootStore';
import EventRepo from './repository/EventRepo';
import { EventModel } from './model/EventModel';
import { EventDTO } from '@/common/constants/interfaces';
import { EVENT_DELETE_OPTION, EVENT_UPDATE_OPTION } from '@/common/constants';
import { toISO, toLuxon } from '@/utils';
import { DateTime } from 'luxon';

export default class EventStore {
  rootStore: RootStore;
  repo: EventRepo;
  event: EventModel = new EventModel({});

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.repo = new EventRepo();

    makeObservable(this, {
      event: observable,
      setEvent: action,
    });
  }

  setEvent(event: EventModel) {
    this.event = event;
  }

  async getEventInfo(eventId: number, start?: string) {
    const utcStart = DateTime.fromISO(start).toUTC().toISODate();
    const res = await this.repo.getEventInfo(eventId, utcStart);
    return new EventModel(res);
  }

  async getEventList(userId: number, start: string, end: string = start, isListView = false) {
    const { eventList, holidayList } = await this.repo.getEventList(userId, start, end);
    if (isListView) return { eventList: eventList.map(event => new EventModel(event)), holidayList };

    const arr: EventModel[] = [];
    eventList.map(event => {
      if (event.rrule) arr.push(...this.makeRRuleObject(event));
      else arr.push(new EventModel(event));
    });
    return { eventList: arr, holidayList };
  }

  makeRRuleObject(event: EventDTO) {
    const { rruleObj, start, end } = new EventModel(event);

    const activeStart = this.rootStore.uiStore.mainApi.view.activeStart;
    const activeEnd = this.rootStore.uiStore.mainApi.view.activeEnd;
    const duration = toLuxon(end).diff(toLuxon(start));

    return rruleObj.between(activeStart, activeEnd).map(day => {
      return new EventModel({
        ...event,
        start: toISO(DateTime.fromJSDate(day).toUTC()),
        end: toISO(DateTime.fromJSDate(day).plus(duration).toUTC()),
      });
    });
  }

  async createEvent({ dto }: EventModel) {
    const res = await this.repo.createEvent(dto);
    this.event = new EventModel(res);
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
