import RootStore from './RootStore';
import { DateTime } from 'luxon';
import { CalendarApi } from '@fullcalendar/react';
import { makeObservable, observable } from 'mobx';
import { toDateString } from '@/utils';

type DateRange = { start: string; view: DateTime; end: string };

interface DialogInfo {
  action: string;
  onCloseClick?: () => void;
  onClick: (() => void)[] | ((value?: string) => void)[];
  data?: {
    title?: string;
    name?: string;
    num?: number;
    placeholder?: string;
  };
  type?: string;
}

interface ContextClickArg {
  target?: HTMLElement;
  position: { top: number; left: number };
  color?: string;
  type?: string;
}

export default class UiStore {
  rootStore: RootStore;

  dateRange: DateRange = {
    start: toDateString(new Date()),
    view: DateTime.now(),
    end: toDateString(this.getLastDayofMonth()),
  };

  mainApi: CalendarApi = null;

  viewMode: string;

  dateDay: DateTime = DateTime.now();

  dialogInfo: DialogInfo = null;

  contextClickArg: ContextClickArg = null;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      dateRange: observable,
      dateDay: observable,
      dialogInfo: observable,
      contextClickArg: observable,
    });
  }

  getLastDayofMonth(): Date {
    const date = new Date();
    const year = date.getFullYear();
    const nextMonth = date.getMonth() + 1;
    return new Date(year, nextMonth, 0);
  }

  setDateRange: (dateRange: DateRange) => void = dateRange => {
    this.dateRange = dateRange;
  };

  getApi(): CalendarApi {
    return this.mainApi;
  }
}
