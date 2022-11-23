import { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import moment from 'moment';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CalendarPickerView } from '@mui/x-date-pickers';
import { Icon, Mui } from '@wapl/ui';
import { DatePickerContainer, DatePickerHeader, SwitchViewButton } from './DatePicker.style';
import PickerBody from './PickerBody';

interface DatePickerProps {
  onChange?: (selectedDate: DateTime) => void;
}

const DatePicker = ({ onChange }: DatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<DateTime>(DateTime.now());
  const [tempDate, setTempDate] = useState<DateTime>(DateTime.now());
  const [view, setView] = useState<CalendarPickerView>('day');
  const [isTitleClick, setTitleClick] = useState<boolean>(false);

  useEffect(() => {
    if (!onChange) return;
    onChange(selectedDate);
  }, [selectedDate]);

  const SwitchIcon = (): JSX.Element => {
    if (isTitleClick) return <Icon.ArrowTopLine color="#191919" width={18} height={18} />;
    return <Icon.ArrowBottomLine color="#191919" width={18} height={18} />;
  };

  const handleSwitch = () => {
    if (isTitleClick) setView('day');
    else setView('year');
    setTitleClick(value => {
      return !value;
    });
  };

  const handlePrevClick = () => {
    const newDate = moment(selectedDate.toFormat('yyyy-LL-dd')).subtract(1, 'months');
    setSelectedDate(DateTime.fromJSDate(new Date(newDate.format('YYYY-MM-DD'))));
  };

  const handleNextClick = () => {
    const newDate = moment(selectedDate.toFormat('yyyy-LL-dd')).add(1, 'months');
    setSelectedDate(DateTime.fromJSDate(new Date(newDate.format('YYYY-MM-DD'))));
  };

  return (
    <DatePickerContainer>
      <DatePickerHeader>
        <SwitchViewButton onClick={handleSwitch}>
          {selectedDate.toFormat('yyyy.LL.')}
          <SwitchIcon />
        </SwitchViewButton>
        <Mui.IconButton onClick={handlePrevClick}>
          <Icon.ArrowBackLine />
        </Mui.IconButton>
        <Mui.IconButton onClick={handleNextClick}>
          <Icon.ArrowFrontLine />
        </Mui.IconButton>
      </DatePickerHeader>
      <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={moment.locale('ko')}>
        <PickerBody
          viewMode={view}
          setView={setView}
          setTitleClick={setTitleClick}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          tempDate={tempDate}
          setTempDate={setTempDate}
        />
      </LocalizationProvider>
    </DatePickerContainer>
  );
};

export default DatePicker;
