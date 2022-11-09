import EventStore from './EventStore';
import UiStore from './UiStore';

export default class RootStore {
  eventStore: EventStore;
  uiStore: UiStore;

  constructor() {
    this.eventStore = new EventStore(this);
    this.uiStore = new UiStore(this);
  }
}
