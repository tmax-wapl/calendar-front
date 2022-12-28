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

interface InputDialogInfo {
  action: string;
  onCloseClick?: () => void;
  onClick: (() => void)[] | ((value?: string) => void)[];
  data?: {
    title?: string;
    placeholder?: string;
  };
}

export default class UiStore {
  rootStore: RootStore;

  dateRange: DateRange = { start: DateTime.now(), view: DateTime.now(), end: DateTime.now() };

  mainApi: CalendarApi = null;

  viewMode: string;

  dateDay: DateTime = DateTime.now();

  dialogInfo: DialogInfo = null;

  inputDialogInfo: InputDialogInfo = null;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      dateRange: observable,
      dateDay: observable,
      dialogInfo: observable,
      inputDialogInfo: observable,
    });
  }

  setDateRange: (dateRange: DateRange) => void = dateRange => {
    this.dateRange = dateRange;
  };

  getApi(): CalendarApi {
    return this.mainApi;
  }
}
