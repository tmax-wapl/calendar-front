import { DateTime } from 'luxon';
import { MonthPicker, YearPicker, CalendarPickerView } from '@mui/x-date-pickers';
import { YearPickerWrapper, MonthPickerWrapper } from './PickerBody.style';

interface PickerBodyProps {
  size: number;
  backgroundColor: string;
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
  size,
  backgroundColor,
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
  switch (viewMode) {
    case 'year':
      return (
        <YearPickerWrapper size={size} backgroundColor={backgroundColor}>
          <YearPicker
            autoFocus
            date={selectedDate}
            onChange={value => {
              setTempDate(value);
              setView('month');
            }}
          />
        </YearPickerWrapper>
      );
    case 'month':
      return (
        <MonthPickerWrapper size={size} backgroundColor={backgroundColor}>
          <MonthPicker
            date={tempDate}
            onChange={value => {
              setTitleDate(value);
              setTitleClick(false);
              setView('day');
            }}
          />
        </MonthPickerWrapper>
      );
    default:
      return <>luxon test</>;
  }
};

export default PickerBody;
