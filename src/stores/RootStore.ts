import CalendarStore from './CalendarStore';
import EventStore from './EventStore';
import UiStore from './UiStore';
import { FileStore } from './FileStore';

export default class RootStore {
  calendarStore: CalendarStore;
  eventStore: EventStore;
  uiStore: UiStore;
  fileStore: FileStore;

  constructor() {
    this.eventStore = new EventStore(this);
    this.uiStore = new UiStore(this);
    this.calendarStore = new CalendarStore(this);
    this.fileStore = new FileStore(this);
  }
}
