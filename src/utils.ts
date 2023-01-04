import moment, { Moment } from 'moment';
import { DateTime } from 'luxon';

export const toLuxon = (date: string | Moment) => {
  if (typeof date === 'string') return DateTime.fromJSDate(new Date(date));
  return DateTime.fromJSDate(new Date(date.format('YYYY-MM-DD')));
};
// for fetch
export const toDateString = (date: Date) => {
  return moment(date).format('YYYY-MM-DD');
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

export const get12HoursFormat = (date: string) => {
  return DateTime.fromJSDate(new Date(date)).toFormat('a h:mm', { locale: 'ko' });
};
