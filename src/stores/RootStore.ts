import EventStore from './EventStore';

export default class RootStore {
  eventStore: EventStore;

  constructor() {
    this.eventStore = new EventStore(this);
  }
}
