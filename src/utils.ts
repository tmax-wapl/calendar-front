import { Moment } from 'moment';
import { DateTime } from 'luxon';

export const toLuxon = (date: string | Moment) => {
  if (typeof date === 'string') return DateTime.fromJSDate(new Date(date));
  return DateTime.fromJSDate(new Date(date.format('YYYY-MM-DD')));
};
