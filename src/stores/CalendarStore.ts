import { action, makeObservable, observable } from 'mobx';
import RootStore from './RootStore';
import CalendarRepo from './repository/CalendarRepo';
import { CalendarDTO, CalendarPatchDTO } from '@/common/constants/interfaces';
import { CalendarModel } from './model/CalendarModel';
import { EventModel } from './model/EventModel';
import { EVENT_DELETE_OPTION } from '@/common/constants';

export default class CalendarStore {
  rootStore: RootStore;
  repo: CalendarRepo;
  renameId: number = null;
  calendarList: CalendarModel[] = null;
  eventList: EventModel[] = [];

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.repo = new CalendarRepo();
    makeObservable(this, {
      renameId: observable,
      setRenameId: action,
      calendarList: observable,
      setCalendarList: action,
      eventList: observable,
      setEventList: action,
      appendEventList: action,
      updateEventList: action,
      filterEventList: action,
      deleteEvent: action,
    });
  }

  setEventList(eventList: EventModel[]) {
    this.eventList = eventList;
  }

  appendEventList(event: EventModel) {
    this.eventList = [...this.eventList, event];
  }

  updateEventList(updatedEvent: EventModel) {
    this.eventList = this.eventList.map(event => (event.id === updatedEvent.id ? updatedEvent : event));
  }

  filterEventList(id: string) {
    this.eventList = this.eventList.filter(event => event.id !== id);
  }

  async createCalendar(dto: Partial<CalendarDTO>) {
    const res = await this.repo.createCalendar(dto);
    const calendar = new CalendarModel({ ...res, checkFlag: true });
    this.calendarList.unshift(calendar);
    this.eventList = [...this.eventList, ...res.eventList.map(event => new EventModel(event))];
  }

  async getCalendarList(userId: number) {
    const data = await this.repo.getCalendarList(userId);
    return data.map((dto: CalendarDTO) => new CalendarModel(dto));
  }

  async syncCalendar(calId: number, start: string, end: string) {
    const iCalendar = await this.repo.getICalendar(calId, start, end);
    this.eventList = this.eventList.filter(item => item.calId !== calId);
    this.setEventList([...this.eventList, ...iCalendar.eventList?.map(event => new EventModel(event))]);
  }

  async getCalendarInfo(calId: number, start: string, end: string) {
    const res = await this.repo.getCalendarInfo(calId, start, end);
    return res;
  }

  async updateCalendar(calId: number, dto: CalendarPatchDTO) {
    await this.repo.updateCalendar(calId, dto);
  }

  async deleteCalendar(calId: number) {
    const res = await this.repo.deleteCalendar(calId);
    this.calendarList = this.calendarList.filter(item => item.id !== res);
    this.eventList = this.eventList.filter(item => item.calId !== res);
  }

  setRenameId(id: number) {
    this.renameId = id;
  }

  setCalendarList(list: CalendarModel[]) {
    this.calendarList = list;
  }

  updateCalendarDTO(id: number, type: 'color' | 'name', value: string) {
    const index = this.calendarList.findIndex(item => item.id === id);
    this.calendarList[index][type] = value;
  }

  updateCalendarChecked(id: number, checkFlag: boolean) {
    const index = this.calendarList.findIndex(item => item.id === id);
    this.calendarList[index] = new CalendarModel({ ...this.calendarList[index].dto, checkFlag });
  }

  async deleteEvent(id: number) {
    await this.rootStore.eventStore.repo.deleteEvent(id, EVENT_DELETE_OPTION.DEFAULT);
    this.eventList = this.eventList.filter(item => item.id !== '' + id);
  }
}
