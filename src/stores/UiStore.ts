import RootStore from './RootStore';
import { DateTime } from 'luxon';
import { CalendarApi } from '@fullcalendar/react';
import { makeObservable, observable, action } from 'mobx';
import { isEqualMonth, isSameDate, toDateString } from '@/utils';
import { EventModel } from './model/EventModel';
import { CustomRoomDTO } from '@/common/constants/interfaces';
import { VIEW_MODE } from '@/common/constants';

type DateRange = { start: string; view?: DateTime; end: string };
type ShareRoom = (personaIdList: number[], roomIdList: number[]) => void;

export interface DialogInfo {
  action?: string;
  onCloseClick?: () => void;
  onClick?: (() => void)[] | ((value?: string) => void)[] | ((value?: CustomRoomDTO[]) => void)[];
  data?: {
    title?: string;
    name?: string;
    num?: number;
    placeholder?: string;
    model?: EventModel;
    selectType?: string;
  };
  onComplete?: any;
  type?: string;
}

interface ContextClickArg {
  target?: HTMLElement;
  position: { top: number; left: number };
  id?: number;
  color?: string;
  hideColorPicker?: boolean;
  type?: string;
  date?: {
    startdate?: string;
    enddate?: string;
  };
}

export default class UiStore {
  rootStore: RootStore;

  dateRange: DateRange = { start: '', view: DateTime.now(), end: '' };

  mainApi: CalendarApi = null;

  viewMode: string;

  dateDay: DateTime = DateTime.now().startOf('day');

  dialogInfo: DialogInfo = null;

  contextClickArg: ContextClickArg = null;

  isImportanceChecked = false;
  isHolidayChecked = true;
  isLunarChecked = true;

  isViewRow = false;
  rowNum: number = null;

  pageDialogInfo: string = null;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this, {
      dateRange: observable,
      setDateRange: action,
      dateDay: observable,
      setDateDay: action,
      dialogInfo: observable,
      setDialogInfo: action,
      contextClickArg: observable,
      setContextClickArg: action,
      isImportanceChecked: observable,
      setImportanceChecked: action,
      isHolidayChecked: observable,
      setHolidayChecked: action,
      isLunarChecked: observable,
      setLunarChecked: action,
      isViewRow: observable,
      rowNum: observable,
      setToggleViewRow: action,
      pageDialogInfo: observable,
    });
  }

  setDateRange(dateRange: DateRange) {
    this.dateRange = dateRange;
  }

  setDateDay(date: DateTime) {
    if (isSameDate(this.dateDay, date) && this.viewMode === VIEW_MODE.MONTH) return;
    this.dateDay = date;
  }

  setDialogInfo(dialogInfo: DialogInfo) {
    this.dialogInfo = dialogInfo;
  }

  setContextClickArg(contextClickArg: ContextClickArg) {
    this.contextClickArg = contextClickArg;
  }

  setImportanceChecked(checked: boolean) {
    this.isImportanceChecked = checked;
  }

  setHolidayChecked(checked: boolean) {
    this.isHolidayChecked = checked;
  }

  setLunarChecked(checked: boolean) {
    this.isLunarChecked = checked;
  }

  setToggleViewRow(rowNum?: number) {
    this.isViewRow = !this.isViewRow;
    if (rowNum) this.rowNum = rowNum;
  }

  getApi(): CalendarApi {
    return this.mainApi;
  }

  changeDateRange(selectDate?: Date) {
    this.setDateRange({
      start: toDateString(this.mainApi.view.activeStart),
      view: DateTime.fromJSDate(!selectDate ? this.mainApi?.getDate() : selectDate),
      end: toDateString(this.mainApi.view.activeEnd),
    });
  }

  handleDateClick(date: DateTime, callback?: () => void) {
    if (!this.mainApi) return;
    this.mainApi.changeView(this.mainApi.view.type, date.toJSDate());
    this.changeDateRange();
    this.setDateDay(date);

    if (callback) callback();
  }
}
