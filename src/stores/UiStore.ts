import RootStore from './RootStore';
import { DateTime } from 'luxon';
import { CalendarApi } from '@fullcalendar/react';
import { makeObservable, observable } from 'mobx';
import { VIEW_MODE } from '@/common/constants/common';

type DateRange = { start: DateTime; view: DateTime; end: DateTime };

export enum RefKey {
  MAIN = 'mainApi',
  MINI = 'miniApi',
}

type Api = { mainApi: CalendarApi; miniApi: CalendarApi };

export default class UiStore {
  rootStore: RootStore;

  dateRange: DateRange = { start: DateTime.now(), view: DateTime.now(), end: DateTime.now() };

  api: Api = { mainApi: null, miniApi: null };

  viewMode: string;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      dateRange: observable,
    });
  }

  setDateRange: (dateRange: DateRange) => void = dateRange => {
    this.dateRange = dateRange;
  };

  setViewMode: (view: string) => void = view => (this.viewMode = view);

  setApi: (key: RefKey, params: CalendarApi) => void = (key, params) => {
    this.api[key] = params;
  };

  getApi(): Api {
    return this.api;
  }
}
