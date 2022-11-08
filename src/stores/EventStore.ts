import RootStore from './RootStore';
import EventRepo from './repository/EventRepo';

export default class EventStore {
  rootStore: RootStore;
  repo: EventRepo;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.repo = new EventRepo();
  }

  async getEventList(appId: string, calendarId: string) {
    const res = await this.repo.getEventList(appId, calendarId);
    return res;
  }
}
