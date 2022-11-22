import { DateTime } from 'luxon';
import moment from 'moment';
import { CalendarPicker, MonthPicker, YearPicker, CalendarPickerView } from '@mui/x-date-pickers';
import { CalendarPickerWrapper } from './PickerBody.style';

interface PickerBodyProps {
  viewMode: CalendarPickerView;
  setView: React.Dispatch<React.SetStateAction<CalendarPickerView>>;
  setTitleClick: React.Dispatch<React.SetStateAction<boolean>>;
  selectedDate: DateTime;
  setSelectedDate: React.Dispatch<React.SetStateAction<DateTime>>;
  tempDate: DateTime;
  setTempDate: React.Dispatch<React.SetStateAction<DateTime>>;
}

const PickerBody = ({
  viewMode,
  setView,
  setTitleClick,
  selectedDate,
  setSelectedDate,
  tempDate,
  setTempDate,
}: PickerBodyProps) => {
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
            setSelectedDate(DateTime.fromJSDate(new Date(value.format('YYYY-MM-DD'))));
            setTitleClick(false);
            setView('day');
          }}
        />
      );
    default:
      return (
        <CalendarPickerWrapper>
          <CalendarPicker
            date={moment(selectedDate.toFormat('yyyy-LL-dd'))}
            onChange={value => {
              setSelectedDate(DateTime.fromJSDate(new Date(value.format('YYYY-MM-DD'))));
            }}
            views={['day']}
            showDaysOutsideCurrentMonth
          />
        </CalendarPickerWrapper>
      );
  }
};

export default PickerBody;
