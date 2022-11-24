import { DateTime } from 'luxon';
import moment, { Moment } from 'moment';
import { PickersDayProps, CalendarPicker, MonthPicker, YearPicker, CalendarPickerView } from '@mui/x-date-pickers';
import { CalendarPickerWrapper, CustomPickersDay } from './PickerBody.style';

interface PickerBodyProps {
  viewMode: CalendarPickerView;
  setView: React.Dispatch<React.SetStateAction<CalendarPickerView>>;
  setTitleClick: React.Dispatch<React.SetStateAction<boolean>>;
  selectedDate: DateTime;
  setSelectedDate: React.Dispatch<React.SetStateAction<DateTime>>;
  titleDate: DateTime;
  setTitleDate: React.Dispatch<React.SetStateAction<DateTime>>;
  tempDate: DateTime;
  setTempDate: React.Dispatch<React.SetStateAction<DateTime>>;
}

const PickerBody = ({
  viewMode,
  setView,
  setTitleClick,
  selectedDate,
  setSelectedDate,
  titleDate,
  setTitleDate,
  tempDate,
  setTempDate,
}: PickerBodyProps) => {
  const renderPickerDay = (day: Moment, selectedDays: Moment[], pickersDayProps: PickersDayProps<Moment>) => {
    const pickerDay = DateTime.fromJSDate(new Date(day.format('YYYY-MM-DD')));
    const isSunday = pickerDay.weekday === 7;
    const isOutside = pickersDayProps.outsideCurrentMonth;
    const isSelected = pickerDay.toFormat('yyyy-LL-dd') === selectedDate.toFormat('yyyy-LL-dd');
    return <CustomPickersDay {...pickersDayProps} isSunday={isSunday} isOutside={isOutside} selected={isSelected} />;
  };

  switch (viewMode) {
    case 'year':
      return (
        <YearPicker
          date={moment(selectedDate.toFormat('yyyy-LL-dd'))}
          onChange={value => {
            setTempDate(DateTime.fromJSDate(new Date(value.format('YYYY-MM-DD'))));
            setView('month');
          }}
        />
      );
    case 'month':
      return (
        <MonthPicker
          date={moment(tempDate.toFormat('yyyy-LL-dd'))}
          onChange={value => {
            setTitleDate(DateTime.fromJSDate(new Date(value.format('YYYY-MM-DD'))));
            setTitleClick(false);
            setView('day');
          }}
        />
      );
    default:
      return (
        <CalendarPickerWrapper>
          <CalendarPicker
            date={moment(titleDate.toFormat('yyyy-LL-dd'))}
            onChange={value => {
              setSelectedDate(DateTime.fromJSDate(new Date(value.format('YYYY-MM-DD'))));
            }}
            views={['day']}
            renderDay={renderPickerDay}
            showDaysOutsideCurrentMonth
          />
        </CalendarPickerWrapper>
      );
  }
};

export default PickerBody;
