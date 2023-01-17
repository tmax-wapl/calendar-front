import { Moment } from 'moment';
import { DateTime } from 'luxon';
import { Options, RRule, RRuleSet, Weekday } from 'rrule';

export const toLuxon = (date: string | Moment) => {
  if (typeof date === 'string') return DateTime.fromJSDate(new Date(date));
  return DateTime.fromJSDate(new Date(date.format('YYYY-MM-DD')));
};
// for fetch
export const toDateString = (date: Date) => {
  return DateTime.fromJSDate(date).toFormat('yyyy-LL-dd');
};

export const diffTime = (startDate: string, endDate: string) => {
  const start: DateTime = DateTime.fromJSDate(new Date(startDate)); // TODO: 효정 util이랑 합치기
  const end: DateTime = DateTime.fromJSDate(new Date(endDate));
  const diff: number = end.valueOf() - start.valueOf();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  return { days, hours, minutes, seconds, diff };
};

export const get12HoursFormat = (date: string | DateTime) => {
  if (typeof date === 'string') return DateTime.fromISO(date).toFormat('a h:mm', { locale: 'ko' });
  return date.toFormat('a h:mm', { locale: 'ko' });
};

export const getRepeatSummary = (rrule: Partial<Options>): string => {
  const units = ['년', '개월', '주', '일'];
  const dayOfWeek = ['월', '화', '수', '목', '금', '토', '일'];
  const byweekday = rrule.byweekday as Weekday[];

  const interval = `${rrule.interval}${units[rrule.freq]} 간격`;
  const weekday = ` ${byweekday?.reduce((acc, day) => (acc ? `${acc} ` : '') + `${dayOfWeek[day.weekday]}`, '')} 반복`;
  const until = ` / ${rrule.until?.toISOString().split('T')[0].replace(/-/g, '.')}. 종료`;

  return `${interval}${byweekday ? weekday : ''}${rrule.until ? until : ''}`;
};

export const toHalfHourUnit = (date: DateTime) => {
  return date.minute < 30 ? date.set({ minute: 0, millisecond: 0 }) : date.set({ minute: 30, millisecond: 0 });
};

export const getStartDate = (date: DateTime) => {
  const now = DateTime.now();
  const isToday = date.startOf('day').equals(now.startOf('day'));
  return isToday ? toHalfHourUnit(date.set({ hour: now.hour, minute: now.minute })) : date.set({ hour: 9 });
};

export const toISO = (date: DateTime) => {
  return date.toISO({ suppressMilliseconds: true });
};

export const isEqualMonth = (mainCalDate: Date, selectedDate: Date) =>
  mainCalDate.getMonth() === selectedDate.getMonth();

export const rruleString = (rrule: Partial<Options>) => {
  const rruleSet = new RRuleSet();
  rruleSet.rrule(new RRule(rrule));
  const [dtstart, freq] = rruleSet.valueOf();
  return dtstart + ' ' + freq;
};

export const isSameDate = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};
