import { makeObservable, observable, action } from 'mobx';
import RootStore from './RootStore';
import EventRepo from './repository/EventRepo';
import { EventModel } from './model/EventModel';
import { EventDTO, EventShareDTO } from '@/common/constants/interfaces';
import { EVENT_UPDATE_OPTION } from '@/common/constants';
import { toISO, applyWeekdayOffset } from '@/utils';
import { DateTime } from 'luxon';

export default class EventStore {
  rootStore: RootStore;
  repo: EventRepo;
  event: EventModel = new EventModel({});
  searchKeyword = '';

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.repo = new EventRepo();

    makeObservable(this, {
      event: observable,
      setEvent: action,
      searchKeyword: observable,
      setSearchKeyword: action,
    });
  }

  setEvent(event: EventModel) {
    this.event = event;
  }

  setSearchKeyword(keyword: string) {
    this.searchKeyword = keyword;
  }

  preprocessEvent(event: EventModel) {
    const { dto, rrule, startDate } = event;
    return new EventModel({
      ...dto,
      ...(rrule?.freq === 2 && { rrule: applyWeekdayOffset(rrule, startDate, 'local').toString() }),
    });
  }

  async getEventInfo(eventId: number, start: string) {
    const utcStart = DateTime.fromISO(start).toUTC().toISODate();
    const res = await this.repo.getEventInfo(eventId, utcStart);
    return this.preprocessEvent(new EventModel(res));
  }

  async getEventList(start: string, end: string = start) {
    const utcStart = DateTime.fromISO(start).toUTC().toISODate();
    const utcEnd = DateTime.fromISO(end).toUTC().toISODate();
    const { eventList, holidayList } = await this.repo.getEventList(utcStart, utcEnd);
    // TODO: 룸 일정 필터 로직 추후 제거
    const eventListMap = new Map();
    const checkedRoomIdListMap = new Map(
      this.rootStore.calendarStore.roomCalendarList
        ?.filter(room => room.checkFlag)
        .map((room, index) => [room.roomId, { index, calendarColor: room.color }]),
    );

    eventList.map(event => {
      const eventInfo = eventListMap.get(event.id);
      if (event.roomId === null) eventListMap.set(event.id, event);
      if (eventInfo) {
        if (checkedRoomIdListMap.get(event.roomId) === undefined) return;
        else if (checkedRoomIdListMap.get(eventInfo.roomId).index > checkedRoomIdListMap.get(event.roomId).index)
          eventListMap.set(event.id, { ...event, calColor: checkedRoomIdListMap.get(event.roomId).calendarColor });
      } else if (event.roomId === null) eventListMap.set(event.id, event);
      else if (checkedRoomIdListMap.has(event.roomId))
        eventListMap.set(event.id, { ...event, calColor: checkedRoomIdListMap.get(event.roomId).calendarColor });
    });

    const arr: EventModel[] = [];
    Array.from(eventListMap.values()).map(event => {
      if (event.rrule && !event.exceptionEvent) arr.push(...this.makeRRuleObject(event));
      else arr.push(new EventModel(event));
    });
    return { eventList: arr, holidayList };
  }

  makeRRuleObject(event: EventDTO) {
    const { rruleObj, startDate, endDate, rrule } = new EventModel(event);

    const activeStart = this.rootStore.uiStore.mainApi.view.activeStart;
    const activeEnd = this.rootStore.uiStore.mainApi.view.activeEnd;
    const duration = endDate.diff(startDate);
    activeStart.setDate(activeStart.getDate() - 1);

    return rruleObj.between(activeStart, activeEnd).map(day => {
      return new EventModel({
        ...event,
        start: toISO(DateTime.fromJSDate(day).toUTC()),
        end: toISO(DateTime.fromJSDate(day).plus(duration).toUTC()),
        ...(rrule.freq === 2 && { rrule: applyWeekdayOffset(rrule, startDate, 'local').toString() }),
      });
    });
  }

  async createEvent({ dto }: EventModel) {
    const res = await this.repo.createEvent(dto);
    this.event = this.preprocessEvent(new EventModel(res));
    return this.event;
  }

  async updateEvent(eventId: number, { dto }: EventModel, updateOption: EVENT_UPDATE_OPTION, originStart?: string) {
    const res = await this.repo.updateEvent(eventId, dto, updateOption, originStart);
    this.event = this.preprocessEvent(new EventModel(res));
    return this.event;
  }

  async deleteEvent(eventId: number) {
    const res = await this.repo.deleteEvent(eventId);
    return res;
  }

  updateEventColor(id: string, color: string) {
    this.rootStore.calendarStore.eventList = this.rootStore.calendarStore.eventList.map(event => {
      if (event.id === id) event.color = color;
      return event;
    });
  }

  async shareEvent(dto: EventShareDTO) {
    const res = await this.repo.shareEvent(dto);
    return res;
  }

  getRepeatEventList(event: EventDTO) {
    const { rruleObj, startDate, endDate, rrule } = new EventModel(event);

    const end = new Date();
    const duration = endDate.diff(startDate);
    end.setFullYear(end.getFullYear() + 1);
    end.setHours(23);
    end.setMinutes(59);
    end.setSeconds(59);

    return rruleObj.between(startDate.minus({ days: 1 }).toJSDate(), end).map(
      day =>
        new EventModel({
          ...event,
          start: toISO(DateTime.fromJSDate(day).toUTC()),
          end: toISO(DateTime.fromJSDate(day).plus(duration).toUTC()),
          ...(rrule.freq === 2 && { rrule: applyWeekdayOffset(rrule, startDate, 'local').toString() }),
        }),
    );
  }

  groupByDate(eventList: EventModel[]) {
    const eventMap = new Map<string, EventModel[]>();
    eventList.forEach(event => {
      const date = event.startDate.toFormat('yyyy-LL-dd');
      eventMap.set(date, eventMap.has(date) ? [...eventMap.get(date), event] : [event]);
    });
    return eventMap;
  }

  async searchEvent(keyword: string, type: 'T') {
    const res = await this.repo.searchEvent(keyword, type);
    const searchEventList = res
      .flatMap(event =>
        event.rrule && !event.exceptionEvent
          ? this.getRepeatEventList(event)
          : this.preprocessEvent(new EventModel(event)),
      )
      .sort((a, b) => a.startDate.toMillis() - b.startDate.toMillis());
    return this.groupByDate(searchEventList);
  }
}
