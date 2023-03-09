import { useState, useRef, useEffect } from 'react';
import { DateTime } from 'luxon';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Icon } from '@wapl/ui';
import { useDidMountEffect } from '@common/hooks';
import {
  DatePickerContainer,
  DatePickerHeader,
  DatePickerBody,
  TitleWrapper,
  TextButton,
  IconButton,
  CalendarPickerButtonWrapper,
} from './DatePicker.style';
import TitlePicker from './TitlePicker';
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
  const [isPickerOpen, setPickerOpen] = useState<boolean>(false);
  const [isYearClick, setYearClick] = useState<boolean>(false);
  const [isMonthClick, setMonthClick] = useState<boolean>(false);
  const year = Array.from(Array(200), (_, i) => `${i + DateTime.now().year - 100}`);
  const month = Array.from(Array(12), (_, i) => `00${i + 1}`.slice(-2));

  useDidMountEffect(() => {
    if (!onDateClick) return;
    onDateClick(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    setTitleDate(date);
  }, [date]);

  const SwitchIcon = (): JSX.Element => {
    if (isPickerOpen) return <Icon.ArrowTopLine width={18} height={18} />;
    return <Icon.ArrowBottomLine width={18} height={18} />;
  };

  const handlePrevClick = () => {
    const newDate = titleDate.plus({ months: -1 });
    setTitleDate(newDate);
  };

  const handleNextClick = () => {
    const newDate = titleDate.plus({ months: 1 });
    setTitleDate(newDate);
  };

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
      <DatePickerHeader size={size}>
        <TitleWrapper>
          <TextButton
            id="yearButton"
            selected={isYearClick}
            onClick={() => {
              setPickerOpen(true);
              setYearClick(true);
            }}
          >
            {titleDate.toFormat('yyyy')}
          </TextButton>
          .
          <TextButton
            id="monthButton"
            selected={isMonthClick}
            onClick={() => {
              setPickerOpen(true);
              setMonthClick(true);
            }}
          >
            {titleDate.toFormat('LL')}
          </TextButton>
          <SwitchIcon />
        </TitleWrapper>
        {isYearClick && (
          <TitlePicker
            width={71}
            item={year}
            selectedValue={`${selectedDate.toFormat('yyyy')}`}
            onValueClick={value => {
              const newDate = titleDate.set({ year: +value });
              setTitleDate(newDate);
              setYearClick(prev => !prev);
              setPickerOpen(prev => !prev);
            }}
            onOutsideClick={e => {
              setYearClick(prev => !prev);
              if (e.target instanceof Element && (e.target.id === 'yearButton' || e.target.id === 'monthButton'))
                return;
              setPickerOpen(prev => !prev);
            }}
          />
        )}
        {isMonthClick && (
          <TitlePicker
            width={56}
            offsetLeft={57}
            item={month}
            selectedValue={`${selectedDate.toFormat('LL')}`}
            onValueClick={value => {
              const newDate = titleDate.set({ month: +value });
              setTitleDate(newDate);
              setMonthClick(prev => !prev);
              setPickerOpen(prev => !prev);
            }}
            onOutsideClick={e => {
              setMonthClick(prev => !prev);
              if (e.target instanceof Element && (e.target.id === 'yearButton' || e.target.id === 'monthButton'))
                return;
              setPickerOpen(prev => !prev);
            }}
          />
        )}
        <CalendarPickerButtonWrapper>
          <IconButton onClick={handlePrevClick}>
            <Icon.ArrowBackLine width={18} height={18} />
          </IconButton>
          <IconButton onClick={handleNextClick}>
            <Icon.ArrowFrontLine width={18} height={18} />
          </IconButton>
        </CalendarPickerButtonWrapper>
      </DatePickerHeader>
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
