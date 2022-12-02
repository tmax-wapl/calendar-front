import { PickersDay } from '@mui/x-date-pickers';
import { DateTime, Info } from 'luxon';
import { CalendarHeader, CalendarContent } from './CalendarPickers.style';

interface CalendarPickerProps {
  date: DateTime;
  startingDay: number;
}

const CalendarPicker = ({ date, startingDay }: CalendarPickerProps) => {
  const weekdays = Array.from(Array(7), (_, i) => Info.weekdays('short', { locale: 'ko' })[(i + startingDay - 1) % 7]);
  const startOfMonth = date.startOf('month').set({ weekday: startingDay });
  const firstDay = startOfMonth > date.startOf('month') ? startOfMonth.minus({ weeks: 1 }) : startOfMonth;
  const dayOfMonth = Array.from(Array(42), (_, i) => firstDay.plus({ days: i }));

  return (
    <>
      {weekdays.map((day, index) => (
        <CalendarHeader key={day} isRed={(index + startingDay - 1) % 7 === 6}>
          {day}
        </CalendarHeader>
      ))}
      <CalendarContent>
        {dayOfMonth.map(date => (
          <PickersDay
            key={date.toFormat('yyyy-LL-dd')}
            day={date}
            onDaySelect={day => {
              console.log('onDaySelect', day);
            }}
            outsideCurrentMonth={false}
          />
        ))}
      </CalendarContent>
    </>
  );
};

export default CalendarPicker;
