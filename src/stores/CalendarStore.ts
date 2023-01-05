import { action, makeObservable, observable } from 'mobx';
import RootStore from './RootStore';
import CalendarRepo from './repository/CalendarRepo';
import { CalendarModel } from './model/CalendarModel';
import { CalendarDTO, CalendarPatchDTO } from '@/common/constants/interfaces';

export default class CalendarStore {
  rootStore: RootStore;
  repo: CalendarRepo;
  calendarList: Array<CalendarModel> = null;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.repo = new CalendarRepo();
    makeObservable(this, {
      calendarList: observable,
      setCalendarList: action,
    });
  }

  async createCalendar(dto: CalendarDTO) {
    const res = await this.repo.calendarCreate(dto);
    return res;
  }

  async getUserCalendars(userId: number, start: string, end: string) {
    const res = await this.repo.getUserCalendars(userId, start, end);
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

  setCalendarList(list: Array<CalendarModel>) {
    this.calendarList = list;
  }
}
