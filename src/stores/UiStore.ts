import RootStore from './RootStore';
import { DateTime } from 'luxon';
import { CalendarApi } from '@fullcalendar/react';
import { makeObservable, observable } from 'mobx';

type DateRange = { start: DateTime; view: DateTime; end: DateTime };

interface DialogInfo {
  action: string;
  onClick: (() => void)[] | ((value?: string) => void)[];
  data?: {
    title?: string;
    name?: string;
    num?: number;
  };
}
export default class UiStore {
  rootStore: RootStore;

  dateRange: DateRange = { start: DateTime.now(), view: DateTime.now(), end: DateTime.now() };

  mainApi: CalendarApi = null;

  viewMode: string;

  dateDay: DateTime = DateTime.now();

  dialogInfo: DialogInfo = null;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      dateRange: observable,
      dateDay: observable,
      dialogInfo: observable,
    });
  }

  setDateRange: (dateRange: DateRange) => void = dateRange => {
    this.dateRange = dateRange;
  };

  setDateDay: (dateDay: DateTime) => void = dateDay => {
    this.dateDay = dateDay;
  };

  setViewMode: (view: string) => void = view => (this.viewMode = view);

  setApi: (ref: CalendarApi) => void = ref => (this.mainApi = ref);

  getApi(): CalendarApi {
    return this.mainApi;
  }
}
