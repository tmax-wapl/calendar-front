import RootStore from './RootStore';
import { DateTime } from 'luxon';
import { CalendarApi } from '@fullcalendar/react';
import { makeObservable, observable, action } from 'mobx';
import { isSameDate, toDateString } from '@/utils';
import { EventModel } from './model/EventModel';
import { CustomRoomDTO } from '@/common/constants/interfaces';
import { VIEW_MODE } from '@/common/constants';

type DateRange = { start: string; view?: DateTime; end: string };

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
  data?: any;
}

interface NotiData {
  eventId: number;
  start: string;
  roomId?: number;
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
  notiData: NotiData = null;
  isDetail = false;
  backEvent = false;

  pageDialogInfo: string = null;
  pickerInfo: 'date' | 'color' | 'repeat' | 'notification' | null = null;

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
      pageDialogInfo: observable,
      setPageDialogInfo: action,
      isLunarChecked: observable,
      setLunarChecked: action,
      notiData: observable,
      setNotiData: action,
      isDetail: observable,
      setIsDetail: action,
      backEvent: observable,
      setBackEvent: action,
      pickerInfo: observable,
      setPickerInfo: action,
    });
  }

  setDateRange(dateRange: DateRange) {
    this.dateRange = dateRange;
  }

  setDateDay(date: DateTime) {
    const isMobile = process.env.IS_MOBILE ?? false;
    if (!isMobile && isSameDate(this.dateDay, date) && this.viewMode === VIEW_MODE.MONTH) return;
    this.dateDay = date;
  }

  setDialogInfo(dialogInfo: DialogInfo) {
    this.dialogInfo = dialogInfo;
  }

  setPickerInfo(pickerType: 'date' | 'color' | 'repeat' | 'notification' | null) {
    this.pickerInfo = pickerType;
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

  setPageDialogInfo(pageDialogInfo: string) {
    this.pageDialogInfo = pageDialogInfo;
  }

  setLunarChecked(checked: boolean) {
    this.isLunarChecked = checked;
  }

  setNotiData(data: NotiData) {
    this.notiData = data;
  }

  setIsDetail(isDetail: boolean) {
    this.isDetail = isDetail;
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
    this.changeDateRange(date.toJSDate());
    this.setDateDay(date);

    if (callback) callback();
  }
  setBackEvent(flag: boolean) {
    this.backEvent = flag;
  }
}
