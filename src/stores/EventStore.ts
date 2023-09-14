import { makeObservable, observable, action } from 'mobx';
import RootStore from './RootStore';
import EventRepo from './repository/EventRepo';
import { EventModel } from './model/EventModel';
import { EventDTO, EventShareDTO, FileInfo } from '@/common/constants/interfaces';
import { EVENT_UPDATE_OPTION } from '@/common/constants';
import { toISO, applyWeekdayOffset, diffTime } from '@/utils';
import { DateTime } from 'luxon';

export default class EventStore {
  rootStore: RootStore;
  repo: EventRepo;
  event: EventModel = new EventModel({});
  searchKeyword = '';
  fileList: FileInfo[] = [];

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.repo = new EventRepo();

    makeObservable(this, {
      event: observable,
      setEvent: action,
      searchKeyword: observable,
      setSearchKeyword: action,
      fileList: observable,
      setFileList: action,
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
      ...{
        calColor:
          (dto.roomId
            ? this.rootStore.calendarStore.roomCalendarList.find(room => room.roomId === dto.roomId).color
            : dto.calColor) || this.rootStore.calendarStore.defaultColor,
      },
    });
  }

  async getEventInfo(eventId: number, start: string, roomId?: number) {
    const utcStart = DateTime.fromISO(start).toUTC().toISODate();
    const res = await this.repo.getEventInfo(eventId, utcStart, roomId);
    return this.preprocessEvent(new EventModel(res));
  }

  async getEventList(start: string, end: string = start) {
    const utcStart = DateTime.fromISO(start).toUTC().toISODate();
    const utcEnd = DateTime.fromISO(end).toUTC().toISODate();
    const { eventList, holidayList } = await this.repo.getEventList(utcStart, utcEnd);
    const eventListMap = this.roomFilteredEventMap(eventList); // TODO: 룸 일정 필터 로직 추후 제거

    const arr: EventModel[] = [];
    Array.from(eventListMap.values()).map(event => {
      if (event.rrule && !event.exceptionEvent) arr.push(...this.makeRRuleObject(event));
      else arr.push(new EventModel(event));
    });
    return { eventList: arr, holidayList };
  }

  makeRRuleObject(event: EventDTO) {
    const { rruleObj, startDate, endDate, rrule } = new EventModel(event);

    const activeStart = this.rootStore.uiStore.mainApi ? this.rootStore.uiStore.mainApi.view.activeStart : new Date();
    const activeEnd = this.rootStore.uiStore.mainApi ? this.rootStore.uiStore.mainApi.view.activeEnd : new Date();

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

  roomFilteredEventMap(eventList: EventDTO[]) {
    const eventListMap = new Map();
    const defaultCalendarColor = this.rootStore.calendarStore.defaultColor;
    const checkedRoomIdListMap = this.rootStore.calendarStore.roomCalendarList?.reduce(
      (map, { roomId, color, checkFlag }, index) => {
        if (checkFlag) map.set(roomId, { index, calendarColor: color || defaultCalendarColor });
        return map;
      },
      new Map(),
    );

    for (const event of eventList) {
      const calColor = event.calColor || defaultCalendarColor;
      if (event.roomId === null) {
        eventListMap.set(event.id, { ...event, calColor });
      } else {
        const checkedRoom = checkedRoomIdListMap?.get(event.roomId);
        const eventInfo = eventListMap.get(event.id);

        if (checkedRoom && (!eventInfo || checkedRoom.index < checkedRoomIdListMap.get(eventInfo.roomId)?.index)) {
          eventListMap.set(event.id, { ...event, calColor: checkedRoom.calendarColor });
        }
      }
    }

    return eventListMap;
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

  async updateEventColor(eventId: number, { dto }: EventModel) {
    await this.repo.updateEventColor(eventId, dto);
  }

  async deleteEvent(eventId: number) {
    const res = await this.repo.deleteEvent(eventId);
    return res;
  }

  updateEventListColor(id: string, color: string) {
    this.rootStore.calendarStore.eventList = this.rootStore.calendarStore.eventList.map(event => {
      if (event.id === id) event.color = color;
      return event;
    });
    if (this.event.id === id) this.event = new EventModel({ ...this.event.dto, color });
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

  async searchEvent(keyword: string, type: 'T') {
    const res = await this.repo.searchEvent(keyword, type);
    const searchEventList = res.content
      .flatMap(event =>
        event.rrule && !event.exceptionEvent
          ? this.getRepeatEventList(event)
          : this.preprocessEvent(new EventModel(event)),
      )
      .sort((a, b) => a.startDate.toMillis() - b.startDate.toMillis());
    return searchEventList;
  }

  setFileList(list: FileInfo[]) {
    this.fileList = list;
  }

  sortEventList(arr: EventModel[]) {
    const sortedArr = arr.slice();
    sortedArr.sort((a, b) => {
      // 중요 일정
      if (a.importance && !b.importance) return -1;
      if (b.importance && !a.importance) return 1;

      // 종일 일정
      if (a.allDay && !b.allDay) return -1;
      if (b.allDay && !a.allDay) return 1;

      // 시작 시간
      const startDiff = diffTime(b.start, a.start).diff;
      if (startDiff) return startDiff;

      // 종료 시간
      const endDiff = diffTime(a.end, b.end).diff;
      if (endDiff) return endDiff;

      // 생성일
      return diffTime(b.regDate, a.regDate).diff;
    });
    return sortedArr;
  }
}
