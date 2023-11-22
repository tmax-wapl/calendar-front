import { useState } from 'react';
import { DateTime } from 'luxon';
import { Icon, Tooltip } from '@wapl/ui';
import { EventDateItemContainer, PickerContainer, DateWrapper, DatePickerWrapper } from './EventDateItemInput.style';
import DatePicker from '../DatePicker/components/DatePicker';
import TimeInput from '../TimeInput/components/TimeInput';
import InputItem from '../InputItem/InputItem';

interface Props {
  title?: string;
  date: DateTime;
  allDay?: boolean;
  isDateInvalid?: boolean;
  isTimeInvalid?: boolean;
  onChange?: (date: DateTime) => void;
}

const EventDateItemInput = ({ title, date, allDay, isDateInvalid, isTimeInvalid, onChange }: Props) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);

  const handleDateClick = () => {
    setIsDatePickerOpen(prev => !prev);
  };

  return (
    <EventDateItemContainer>
      {title}
      <PickerContainer>
        {!isDatePickerOpen ? (
          <Tooltip
            disableHoverListener={!isDateInvalid}
            placement="top"
            title="시작일과 같거나 이후로 설정해 주세요."
            sx={{ '.MuiTooltip-tooltip': { maxWidth: '250px' } }}
          >
            <DateWrapper
              className={`${isDatePickerOpen ? 'selected' : ''}`}
              isInvalid={isDateInvalid}
              onClick={handleDateClick}
            >
              {date.toFormat('yyyy.LL.dd')}
              <Icon.CalendarLine className="ml-4" width={16} height={16} />
            </DateWrapper>
          </Tooltip>
        ) : (
          <DateWrapper>
            <InputItem value={date} onChange={onChange} onPickerClose={handleDateClick} type="date" />
          </DateWrapper>
        )}
        {isDatePickerOpen && (
          <DatePickerWrapper allDay={allDay}>
            <DatePicker date={date} onDateClick={onChange} onOutsideClick={handleDateClick} />
          </DatePickerWrapper>
        )}
      </PickerContainer>
      {!allDay && (
        <TimeInput
          date={date}
          handleChange={onChange}
          invalidTime={isTimeInvalid}
          invalidTitle="시작일과 같거나 이후로 설정해 주세요."
        />
      )}
    </EventDateItemContainer>
  );
};

export default EventDateItemInput;
