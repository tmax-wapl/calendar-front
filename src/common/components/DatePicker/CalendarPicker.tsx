import { DateTime, Info } from 'luxon';
import { CalendarHeader, CalendarContent, CustomPickersDay } from './CalendarPickers.style';

interface CalendarPickerProps {
  date: DateTime;
  startingDay: number;
  selectedDate: DateTime;
  setSelectedDate: React.Dispatch<React.SetStateAction<DateTime>>;
}

const CalendarPicker = ({ date, startingDay, selectedDate, setSelectedDate }: CalendarPickerProps) => {
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
        {dayOfMonth.map(value => (
          <CustomPickersDay
            key={value.toFormat('yyyy-LL-dd')}
            day={value}
            onDaySelect={value => {
              setSelectedDate(value);
            }}
            isSunday={value.weekday === 7}
            isOutside={date.month !== value.month}
            selected={value.toFormat('yyyy-LL-dd') === selectedDate.toFormat('yyyy-LL-dd')}
            outsideCurrentMonth={false}
          />
        ))}
      </CalendarContent>
    </>
  );
};

export default CalendarPicker;
