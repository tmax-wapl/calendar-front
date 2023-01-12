import { makeObservable, observable, action } from 'mobx';
import RootStore from './RootStore';
import EventRepo from './repository/EventRepo';
import { EventModel } from './model/EventModel';
import { EventDTO } from '@/common/constants/interfaces';
import { EVENT_DELETE_OPTION, EVENT_UPDATE_OPTION } from '@/common/constants';
import { RRule, RRuleSet } from 'rrule';
import { isSameDate, toISO } from '@/utils';
import { DateTime } from 'luxon';

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
    const arr: EventModel[] = [];
    eventList.map(event => {
      if (event.rrule) arr.push(...this.makeRRuleObject(event));
      else arr.push(new EventModel(event));
    });
    return arr;
  }

  makeRRuleObject(event: EventDTO) {
    const { rrule, exceptionList } = new EventModel(event);
    const rruleSet = new RRuleSet();
    rruleSet.rrule(new RRule(rrule));

    const start = this.rootStore.uiStore.mainApi.view.activeStart;
    const end = this.rootStore.uiStore.mainApi.view.activeEnd;
    if (exceptionList && exceptionList.length > 0) {
      exceptionList.forEach(value => {
        const [year, month, day, time, minute] = value.exceptionDate; // month 0 ~ 11
        rruleSet.exdate(new Date(year, month - 1, day, time, minute));
      });
    }

    let repeatList = rruleSet.between(start, end);

    if (rruleSet._exdate.length > 0) {
      repeatList = repeatList.filter(date => {
        const arr = rruleSet._exdate.map(exdate => {
          if (!isSameDate(date, exdate)) return date;
        })[0];
        if (arr) return arr;
      });
    }

    return repeatList.map(day => {
      return new EventModel({
        ...event,
        start: toISO(DateTime.fromJSDate(day)),
        end: toISO(DateTime.fromJSDate(day)),
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
