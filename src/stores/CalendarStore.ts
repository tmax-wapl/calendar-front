import { action, makeObservable, observable } from 'mobx';
import RootStore from './RootStore';
import CalendarRepo from './repository/CalendarRepo';
import { CalendarDTO, CalendarPatchDTO, CalendarShareDTO, HolidayDTO } from '@/common/constants/interfaces';
import { CalendarModel } from './model/CalendarModel';
import { EventModel } from './model/EventModel';

export default class CalendarStore {
  rootStore: RootStore;
  repo: CalendarRepo;
  renameId: number = null;
  calendarList: CalendarModel[] = null;
  roomCalendarList: CalendarModel[] = [];
  eventList: EventModel[] = [];
  holidayList: HolidayDTO[] = [];
  calendar: CalendarModel = null;
  defaultColor: string = null;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.repo = new CalendarRepo();
    makeObservable(this, {
      renameId: observable,
      setRenameId: action,
      calendarList: observable,
      setCalendarList: action,
      roomCalendarList: observable,
      setRoomCalendarList: action,
      eventList: observable,
      setEventList: action,
      calendar: observable,
      setCalendar: action,
      holidayList: observable,
      appendEventList: action,
      updateEventList: action,
      filterEventList: action,
      deleteEvent: action,
      setHolidayList: action,
    });
  }

  setEventList(eventList: EventModel[]) {
    this.eventList = eventList;
  }

  setRoomCalendarList(roomCalendarList: CalendarModel[]) {
    this.roomCalendarList = roomCalendarList;
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
  setHolidayList(holidayList: HolidayDTO[]) {
    this.holidayList = holidayList;
  }

  async createCalendar(dto: Partial<CalendarDTO>) {
    const res = await this.repo.createCalendar(dto);
    const calendar = new CalendarModel({ ...res, checkFlag: true });
    this.calendarList.unshift(calendar);
    this.eventList = [...this.eventList, ...res.eventList.map(event => new EventModel(event))];
  }

  async getCalendarList() {
    const data = await this.repo.getCalendarList();
    return data.map((dto: CalendarDTO) => new CalendarModel(dto));
  }

  async syncCalendar(calId: number, start: string, end: string) {
    const iCalendar = await this.repo.getICalendar(calId, start, end);
    const index = this.calendarList.findIndex(item => item.id === calId);
    this.calendarList[index] = new CalendarModel({
      ...this.calendarList[index].dto,
      subscribeStatus: iCalendar.subscribeStatus,
    });
    return iCalendar;
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

  updateCalendarDTO(id: number, type: 'color' | 'name' | 'subscribeStatus', value: string) {
    const index = this.calendarList.findIndex(item => item.id === id);
    this.calendarList[index][type] = value;
  }

  updateCalendarChecked(id: number, checkFlag: boolean) {
    const index = this.calendarList.findIndex(item => item.id === id);
    this.calendarList[index] = new CalendarModel({ ...this.calendarList[index].dto, checkFlag });
  }

  async deleteEvent(id: number) {
    await this.rootStore.eventStore.repo.deleteEvent(id);
    this.eventList = this.eventList.filter(item => item.id !== '' + id);
  }

  getCalendarId() {
    return this.calendarList?.find(item => item.mainFlag)?.id;
  }

  setCalendar(calendar: CalendarModel) {
    this.calendar = calendar;
  }

  async shareCalendar(dto: CalendarShareDTO) {
    const res = await this.repo.shareCalendar(dto);
    return res;
  }

  setDefaultColor(color: string) {
    this.defaultColor = color;
  }

  setInitialLocalRoomCalendarList(personaId: number) {
    const setting = JSON.parse(localStorage.getItem('RoomCalendarList'));
    if (!setting) {
      const initial = {} as { [key: number]: [] };
      initial[personaId] = [];
      localStorage.setItem('RoomCalendarList', JSON.stringify(initial));
      return;
    }
    if (!setting[personaId]) {
      setting[personaId] = [];
      localStorage.setItem('RoomCalendarList', JSON.stringify(setting));
    }
  }

  getLocalRoomCalendarList(personaId: number) {
    const setting = JSON.parse(localStorage.getItem('RoomCalendarList'));
    if (!setting) {
      return [];
    }
    if (!setting[personaId]) {
      setting[personaId] = [];
    }
    if (setting[personaId]) {
      return setting[personaId];
    }
  }

  setLocalRoomCalendarList(personaId: number, roomList: Partial<CalendarDTO>[]) {
    let setting = JSON.parse(localStorage.getItem('RoomCalendarList'));
    if (!setting) {
      setting = {};
    }
    if (!setting[personaId]) {
      setting[personaId] = [];
    }
    setting[personaId] = roomList;
    const settingString = JSON.stringify(setting);
    localStorage.setItem('RoomCalendarList', settingString);
    this.setRoomCalendarList(roomList.map(room => new CalendarModel(room)));
  }

  addLocalRoomCalendarItem(personaId: number, roomItem: Partial<CalendarDTO>) {
    const roomCalenarList = JSON.parse(localStorage.getItem('RoomCalendarList'));
    if (roomCalenarList) {
      const isContained = roomCalenarList[personaId]?.some((room: CalendarDTO) => room.id === roomItem.id);
      if (isContained) {
        roomCalenarList[personaId] = roomCalenarList[personaId]?.map((room: CalendarDTO) =>
          room.id === roomItem.id ? roomItem : room,
        );
      } else roomCalenarList[personaId] = [...roomCalenarList[personaId], roomItem];

      const settingString = JSON.stringify(roomCalenarList);

      localStorage.setItem('RoomCalendarList', settingString);
    }
  }
}
