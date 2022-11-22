import { useState } from 'react';
import { DateTime } from 'luxon';
import moment from 'moment';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CalendarPickerView } from '@mui/x-date-pickers';
import { Icon } from '@wapl/ui';
import { DatePickerContainer, DatePickerHeader, SwitchViewButton } from './DatePicker.style';
import PickerBody from './PickerBody';

const DatePicker = () => {
  const [date, setDate] = useState<DateTime>(DateTime.now());
  const [view, setView] = useState<CalendarPickerView>('day');
  const [isTitleClick, setTitleClick] = useState<boolean>(false);

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

  return (
    <DatePickerContainer>
      <DatePickerHeader>
        <SwitchViewButton onClick={handleSwitch}>
          {date.toFormat('yyyy.LL.')}
          <SwitchIcon />
        </SwitchViewButton>
      </DatePickerHeader>
      <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={moment.locale('ko')}>
        <PickerBody viewMode={view} setView={setView} setTitleClick={setTitleClick} date={date} setDate={setDate} />
      </LocalizationProvider>
    </DatePickerContainer>
  );
};

export default DatePicker;
