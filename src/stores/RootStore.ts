import CalendarStore from './CalendarStore';
import EventStore from './EventStore';
import UiStore from './UiStore';

export default class RootStore {
  calendarStore: CalendarStore;
  eventStore: EventStore;
  uiStore: UiStore;

  constructor() {
    this.eventStore = new EventStore(this);
    this.uiStore = new UiStore(this);
    this.calendarStore = new CalendarStore(this);
  }
}
