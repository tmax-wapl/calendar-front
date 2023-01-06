import { action, makeObservable, observable } from 'mobx';
import RootStore from './RootStore';
import CalendarRepo from './repository/CalendarRepo';
import { CalendarModel } from './model/CalendarModel';
import { CalendarDTO, CalendarPatchDTO } from '@/common/constants/interfaces';

export default class CalendarStore {
  rootStore: RootStore;
  repo: CalendarRepo;
  renameId: number = null;
  calendarList: CalendarModel[] = null;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.repo = new CalendarRepo();
    makeObservable(this, {
      renameId: observable,
      setRenameId: action,
      calendarList: observable,
      setCalendarList: action,
    });
  }

  async createCalendar(dto: CalendarDTO) {
    const res = await this.repo.calendarCreate(dto);
    return res;
  }

  async getCalendarList(userId: number, start: string, end: string) {
    const data = await this.repo.getCalendarList(userId, start, end);
    const res = data.map((dto: CalendarDTO) => new CalendarModel(dto));
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

  setRenameId(id: number) {
    this.renameId = id;
  }

  setCalendarList(list: CalendarModel[]) {
    this.calendarList = list;
  }

  updateCalendarColor(id: number, color: string) {
    const index = this.calendarList.findIndex(item => item.id === id);
    // this.calendarList[index].color = color;
    this.calendarList[index] = new CalendarModel({ ...this.calendarList[index].dto, color });
  }

  updateCalendarName(id: number, name: string) {
    const index = this.calendarList.findIndex(item => item.id === id);
    // this.calendarList[index].name = name;
    this.calendarList[index] = new CalendarModel({ ...this.calendarList[index].dto, name });
  }

  updateCalendarChecked(id: number, checkFlag: boolean) {
    const index = this.calendarList.findIndex(item => item.id === id);
    // this.calendarList[index].checkFlag = checkFlag;
    this.calendarList[index] = new CalendarModel({ ...this.calendarList[index].dto, checkFlag });
  }
}
