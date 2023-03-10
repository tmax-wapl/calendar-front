import { useState, useRef, useEffect } from 'react';
import { DateTime } from 'luxon';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useDidMountEffect } from '@common/hooks';
import { DatePickerContainer, DatePickerBody } from './DatePicker.style';
import DatePickerHeader from './DatePickerHeader';
import CalendarPicker from './CalendarPicker';

interface DatePickerProps {
  size?: number;
  backgroundColor?: string;
  startingDay?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  date?: DateTime;
  onDateClick?: (selectedDate: DateTime) => void;
  onOutsideClick?: () => void;
}

const DatePicker = ({
  size = 1,
  backgroundColor = '#ffffff',
  startingDay = 7,
  date = DateTime.now(),
  onDateClick,
  onOutsideClick,
}: DatePickerProps) => {
  const pickerRef = useRef<HTMLDivElement | null>(null);
  const [selectedDate, setSelectedDate] = useState<DateTime>(date);
  const [titleDate, setTitleDate] = useState<DateTime>(selectedDate);

  useDidMountEffect(() => {
    if (!onDateClick) return;
    onDateClick(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    setTitleDate(date);
  }, [date]);

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      !(e.target instanceof Node) ||
      pickerRef.current?.parentElement?.parentElement?.contains(e.target) ||
      !onOutsideClick
    )
      return;
    onOutsideClick();
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  });

  return (
    <DatePickerContainer ref={pickerRef} backgroundColor={backgroundColor}>
      <DatePickerHeader size={size} selectedDate={selectedDate} titleDate={titleDate} setTitleDate={setTitleDate} />
      <DatePickerBody size={size}>
        <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="ko">
          <CalendarPicker
            size={size}
            backgroundColor={backgroundColor}
            date={titleDate}
            startingDay={startingDay}
            setTitleDate={setTitleDate}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </LocalizationProvider>
      </DatePickerBody>
    </DatePickerContainer>
  );
};

export default DatePicker;
