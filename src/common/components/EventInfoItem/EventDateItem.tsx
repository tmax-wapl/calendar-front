import { useState } from 'react';
import { DateTime } from 'luxon';
import { Icon, Tooltip } from '@wapl/ui';
import {
  EventDateItemContainer,
  PickerContainer,
  DateWrapper,
  DatePickerWrapper,
  TimeWrapper,
  TimeValue,
  TimePickerWrapper,
} from './EventDateItem.style';
import DatePicker from '../DatePicker/DatePicker';
import TimePicker from '../TimePicker/TimePicker';

interface Props {
  title?: string;
  date: DateTime;
  allDay?: boolean;
  isDateInvalid?: boolean;
  isTimeInvalid?: boolean;
  onChange?: (date: DateTime) => void;
}

const EventDateItem = ({ title, date, allDay, isDateInvalid, isTimeInvalid, onChange }: Props) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState<boolean>(false);

  const handleDateClick = () => {
    setIsDatePickerOpen(prev => !prev);
  };

  const handleTimeClick = () => {
    setIsTimePickerOpen(prev => !prev);
  };

  return (
    <EventDateItemContainer>
      {title}
      <PickerContainer>
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
            <Icon.CalendarLine className="ml-8" color="#202124" width={16} height={16} />
          </DateWrapper>
        </Tooltip>
        {isDatePickerOpen && (
          <DatePickerWrapper>
            <DatePicker size={0.85} date={date} onDateClick={onChange} onOutsideClick={handleDateClick} />
          </DatePickerWrapper>
        )}
      </PickerContainer>
      {!allDay && (
        <PickerContainer>
          <Tooltip
            disableHoverListener={isDateInvalid || !isTimeInvalid}
            placement="top-end"
            title="시작일과 같거나 이후로 설정해 주세요."
            sx={{ '.MuiTooltip-tooltip': { maxWidth: '250px' } }}
          >
            <TimeWrapper
              className={`${isTimePickerOpen ? 'selected' : ''}`}
              isInvalid={!isDateInvalid && isTimeInvalid}
              onClick={handleTimeClick}
            >
              <TimeValue>{date.toFormat('a', { locale: 'ko' })}</TimeValue>
              <TimeValue>{date.toFormat('h:mm')}</TimeValue>
            </TimeWrapper>
          </Tooltip>
          {isTimePickerOpen && (
            <TimePickerWrapper>
              <TimePicker value={date} onChange={onChange} onOutsideClick={handleTimeClick} />
            </TimePickerWrapper>
          )}
        </PickerContainer>
      )}
    </EventDateItemContainer>
  );
};

export default EventDateItem;
