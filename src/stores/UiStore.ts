import RootStore from './RootStore';
import { DateTime } from 'luxon';
import { CalendarApi } from '@fullcalendar/react';
import { makeObservable, observable, action } from 'mobx';
import { isEqualMonth, toDateString } from '@/utils';

type DateRange = { start: string; view?: DateTime; end: string };

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
  id?: number;
  color?: string;
  type?: string;
}

export default class UiStore {
  rootStore: RootStore;

  dateRange: DateRange = { start: '', view: DateTime.now(), end: '' };

  mainApi: CalendarApi = null;

  viewMode: string;

  dateDay: DateTime = DateTime.now().startOf('day');

  dialogInfo: DialogInfo = null;

  contextClickArg: ContextClickArg = null;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      dateRange: observable,
      setDateRange: action,
      dateDay: observable,
      setDateDay: action,
      dialogInfo: observable,
      contextClickArg: observable,
      setContextClickArg: action,
    });
  }

  setDateRange(dateRange: DateRange) {
    this.dateRange = dateRange;
  }

  setDateDay(date: DateTime) {
    this.dateDay = date;
  }

  setContextClickArg(contextClickArg: ContextClickArg) {
    this.contextClickArg = contextClickArg;
  }

  getApi(): CalendarApi {
    return this.mainApi;
  }

  changeDateRange() {
    this.setDateRange({
      start: toDateString(this.mainApi.view.activeStart),
      view: DateTime.fromJSDate(this.mainApi?.getDate()),
      end: toDateString(this.mainApi.view.activeEnd),
    });
  }

  handleDateClick(date: DateTime, callback?: () => void) {
    if (!this.mainApi) return;
    // 같은 달 내에서 선택 할 때 main calendar render 안하도록.
    if (isEqualMonth(this.mainApi?.getDate(), date?.toJSDate())) return;
    this.mainApi.changeView(this.mainApi.view.type, date.toJSDate());
    this.changeDateRange();
    if (callback) callback();
  }
}
