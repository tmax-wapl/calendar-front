import { useState } from 'react';
import { DateTime } from 'luxon';
import { Icon } from '@wapl/ui';
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
  onChange?: (date: DateTime) => void;
}

const EventDateItem = ({ title, date, allDay, onChange }: Props) => {
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
        <DateWrapper className={`${isDatePickerOpen ? 'selected' : ''}`} onClick={handleDateClick}>
          {date.toFormat('yyyy.LL.dd')}
          <Icon.CalendarLine className="ml-8" color="#202124" width={16} height={16} />
        </DateWrapper>
        {isDatePickerOpen && (
          <DatePickerWrapper>
            <DatePicker size={0.85} date={date} onDateClick={onChange} onOutsideClick={handleDateClick} />
          </DatePickerWrapper>
        )}
      </PickerContainer>
      {!allDay && (
        <PickerContainer>
          <TimeWrapper className={`${isTimePickerOpen ? 'selected' : ''}`} onClick={handleTimeClick}>
            <TimeValue>{date.toFormat('a', { locale: 'ko' })}</TimeValue>
            <TimeValue>{date.toFormat('h:mm')}</TimeValue>
          </TimeWrapper>
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
