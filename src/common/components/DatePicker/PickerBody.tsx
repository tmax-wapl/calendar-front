import { DateTime } from 'luxon';
import moment from 'moment';
import { CalendarPicker, MonthPicker, YearPicker, CalendarPickerView } from '@mui/x-date-pickers';
import { CalendarPickerWrapper } from './PickerBody.style';

interface PickerBodyProps {
  viewMode: CalendarPickerView;
  setView: React.Dispatch<React.SetStateAction<CalendarPickerView>>;
  setTitleClick: React.Dispatch<React.SetStateAction<boolean>>;
  date: DateTime;
  setDate: React.Dispatch<React.SetStateAction<DateTime>>;
}

const PickerBody = ({ viewMode, setView, setTitleClick, date, setDate }: PickerBodyProps) => {
  switch (viewMode) {
    case 'year':
      return (
        <YearPicker
          date={moment(date.toFormat('yyyy-LL-dd'))}
          onChange={value => {
            setDate(DateTime.fromJSDate(new Date(value.format('YYYY-MM-DD'))));
            setView('month');
          }}
        />
      );
    case 'month':
      return (
        <MonthPicker
          date={moment(date.toFormat('yyyy-LL-dd'))}
          onChange={value => {
            setDate(DateTime.fromJSDate(new Date(value.format('YYYY-MM-DD'))));
            setTitleClick(false);
            setView('day');
          }}
        />
      );
    default:
      return (
        <CalendarPickerWrapper>
          <CalendarPicker
            date={moment(date.toFormat('yyyy-LL-dd'))}
            onChange={value => {
              setDate(DateTime.fromJSDate(new Date(value.format('YYYY-MM-DD'))));
            }}
            views={['day']}
            showDaysOutsideCurrentMonth
          />
        </CalendarPickerWrapper>
      );
  }
};

export default PickerBody;
