import { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CalendarPickerView } from '@mui/x-date-pickers';
import { Icon } from '@wapl/ui';
import {
  DatePickerContainer,
  DatePickerHeader,
  DatePickerBody,
  StyledIconButton,
  CalendarPickerButtonWrapper,
} from './DatePicker.style';
import PickerBody from './PickerBody';

interface DatePickerProps {
  size?: number;
  backgroundColor?: string;
  startingDay?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  date?: DateTime;
  onDateClick?: (selectedDate: DateTime) => void;
}

const DatePicker = ({
  size = 1,
  backgroundColor = '#ffffff',
  startingDay = 7,
  date = DateTime.now(),
  onDateClick,
}: DatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<DateTime>(date);
  const [titleDate, setTitleDate] = useState<DateTime>(selectedDate);
  const [tempDate, setTempDate] = useState<DateTime>(date);
  const [view, setView] = useState<CalendarPickerView>('day');
  const [isTitleClick, setTitleClick] = useState<boolean>(false);

  useEffect(() => {
    if (!onDateClick) return;
    onDateClick(selectedDate);
  }, [selectedDate]);

  const SwitchIcon = (): JSX.Element => {
    if (isTitleClick) return <Icon.ArrowTopLine color="#191919" width={18} height={18} />;
    return <Icon.ArrowBottomLine color="#191919" width={18} height={18} />;
  };

  const handleSwitch = () => {
    if (isTitleClick) setView('day');
    else setView('year');
    setTitleClick(value => !value);
  };

  const handlePrevClick = () => {
    const newDate = titleDate.plus({ months: -1 });
    setTitleDate(newDate);
  };

  const handleNextClick = () => {
    const newDate = titleDate.plus({ months: 1 });
    setTitleDate(newDate);
  };

  return (
    <DatePickerContainer size={size} backgroundColor={backgroundColor}>
      <DatePickerHeader>
        <StyledIconButton onClick={handleSwitch}>
          {titleDate.toFormat('yyyy.LL.')}
          <SwitchIcon />
        </StyledIconButton>
        {!isTitleClick && (
          <CalendarPickerButtonWrapper>
            <StyledIconButton onClick={handlePrevClick}>
              <Icon.ArrowBackLine color="#202124" width={18} height={18} />
            </StyledIconButton>
            <StyledIconButton onClick={handleNextClick}>
              <Icon.ArrowFrontLine color="#202124" width={18} height={18} />
            </StyledIconButton>
          </CalendarPickerButtonWrapper>
        )}
      </DatePickerHeader>
      <DatePickerBody>
        <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="ko">
          <PickerBody
            size={size}
            backgroundColor={backgroundColor}
            startingDay={startingDay}
            viewMode={view}
            setView={setView}
            setTitleClick={setTitleClick}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            titleDate={titleDate}
            setTitleDate={setTitleDate}
            tempDate={tempDate}
            setTempDate={setTempDate}
          />
        </LocalizationProvider>
      </DatePickerBody>
    </DatePickerContainer>
  );
};

export default DatePicker;
