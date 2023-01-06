import { makeObservable, observable, action } from 'mobx';
import RootStore from './RootStore';
import CalendarRepo from './repository/CalendarRepo';
import { CalendarDTO, CalendarPatchDTO } from '@/common/constants/interfaces';
import { EventModel } from './model/EventModel';

export default class CalendarStore {
  rootStore: RootStore;
  repo: CalendarRepo;
  eventList: EventModel[] = [];

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.repo = new CalendarRepo();

    makeObservable(this, {
      eventList: observable,
      setEventList: action,
      appendEventList: action,
    });
  }

  setEventList(eventList: EventModel[]) {
    this.eventList = eventList;
  }

  appendEventList(event: EventModel) {
    this.eventList = [...this.eventList, event];
  }

  async createCalendar(dto: CalendarDTO) {
    const res = await this.repo.calendarCreate(dto);
    return res;
  }

  async getCalendarInfo(calId: number, start: string, end: string) {
    const res = await this.repo.getCalendarInfo(calId, start, end);
    return res;
  }

  async calendarUpdate(calId: number, dto: CalendarPatchDTO) {
    const res = await this.repo.calendarUpdate(calId, dto);
    return res;
  }

  async calendarDelete(calId: number) {
    const res = await this.repo.calendarDelete(calId);
    return res;
  }
}
