import RootStore from './RootStore';
import CalendarRepo from './repository/CalendarRepo';

export default class CalendarStore {
  rootStore: RootStore;
  repo: CalendarRepo;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.repo = new CalendarRepo();
  }

  async createCalendar() {
    const res = await this.repo.calendarCreate();
    return res;
  }

  async getCalendarInfo() {
    const res = await this.repo.getCalendarInfo(14);
    return res;
  }
}
