import React, { useState } from 'react';
import { DateTime } from 'luxon';
import { Icon, Switch } from '@wapl/ui';
import {
  EventDateContainer,
  ItemTitleContainer,
  DateRangeContainer,
  PickerContainer,
  DateWrapper,
  DatePickerWrapper,
  TimeWrapper,
  TimePickerWrapper,
} from './EventDate.style';
import DatePicker from '../DatePicker/DatePicker';
import TimePicker from '../TimePicker/TimePicker';

interface Props {
  allDay?: boolean;
  startDate: DateTime;
  startTime?: DateTime;
  endDate: DateTime;
  endTime?: DateTime;
  onChange?: (value: { [key: string]: boolean | DateTime }) => void;
}

const EventDate = ({ allDay = false, startDate, startTime, endDate, endTime, onChange }: Props) => {
  const [isStartDatePickerOpen, setIsStartDatePickerOpen] = useState<boolean>(false);
  const [isStartTimePickerOpen, setIsStartTimePickerOpen] = useState<boolean>(false);
  const [isEndDatePickerOpen, setIsEndDatePickerOpen] = useState<boolean>(false);
  const [isEndTimePickerOpen, setIsEndTimePickerOpen] = useState<boolean>(false);

  const handleSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ allDay: e.target.checked });
  };

  const handleStartDateChange = (date: DateTime) => {
    onChange({ startDate: date });
  };

  const handleStartDateClick = () => {
    setIsStartDatePickerOpen(prev => !prev);
  };

  const handleStartTimeClick = () => {
    setIsStartTimePickerOpen(prev => !prev);
  };

  const handleStartTimeChange = (time: DateTime) => {
    onChange({ startTime: time });
  };

  const handleEndDateChange = (date: DateTime) => {
    onChange({ endDate: date });
  };

  const handleEndDateClick = () => {
    setIsEndDatePickerOpen(prev => !prev);
  };

  const handleEndTimeClick = () => {
    setIsEndTimePickerOpen(prev => !prev);
  };

  const handleEndTimeChange = (time: DateTime) => {
    onChange({ endTime: time });
  };

  return (
    <EventDateContainer>
      <ItemTitleContainer>
        <Icon.Add1Line className="mr-8" color="#202124" width={20} height={20} />
        종일
        <Switch size="small" checked={allDay} onChange={handleSwitch} />
      </ItemTitleContainer>
      <DateRangeContainer>
        시작일
        <PickerContainer>
          <DateWrapper className={`${isStartDatePickerOpen ? 'selected' : ''}`} onClick={handleStartDateClick}>
            {startDate.toFormat('yyyy.LL.dd')}
            <Icon.CalendarLine className="ml-8" color="#202124" width={16} height={16} />
          </DateWrapper>
          {isStartDatePickerOpen && (
            <DatePickerWrapper>
              <DatePicker size={0.85} date={startDate} onDateClick={handleStartDateChange} />
            </DatePickerWrapper>
          )}
        </PickerContainer>
        {!allDay && (
          <PickerContainer>
            <TimeWrapper className={`${isStartTimePickerOpen ? 'selected' : ''}`} onClick={handleStartTimeClick}>
              {startTime.toFormat('a h:mm', { locale: 'ko' })}
            </TimeWrapper>
            {isStartTimePickerOpen && (
              <TimePickerWrapper>
                <TimePicker
                  meridiem={startTime?.toFormat('a', { locale: 'ko' })}
                  hour={startTime?.toFormat('h')}
                  minute={startTime?.toFormat('mm')}
                  onChange={handleStartTimeChange}
                />
              </TimePickerWrapper>
            )}
          </PickerContainer>
        )}
      </DateRangeContainer>
      <DateRangeContainer>
        마감일
        <PickerContainer>
          <DateWrapper className={`${isEndDatePickerOpen ? 'selected' : ''}`} onClick={handleEndDateClick}>
            {endDate.toFormat('yyyy.LL.dd')}
            <Icon.CalendarLine className="ml-8" color="#202124" width={16} height={16} />
          </DateWrapper>
          {isEndDatePickerOpen && (
            <DatePickerWrapper>
              <DatePicker size={0.85} date={endDate} onDateClick={handleEndDateChange} />
            </DatePickerWrapper>
          )}
        </PickerContainer>
        {!allDay && (
          <PickerContainer>
            <TimeWrapper className={`${isEndTimePickerOpen ? 'selected' : ''}`} onClick={handleEndTimeClick}>
              {endTime.toFormat('a h:mm', { locale: 'ko' })}
            </TimeWrapper>
            {isEndTimePickerOpen && (
              <TimePickerWrapper>
                <TimePicker
                  meridiem={endTime?.toFormat('a', { locale: 'ko' })}
                  hour={endTime?.toFormat('h')}
                  minute={endTime?.toFormat('mm')}
                  onChange={handleEndTimeChange}
                />
              </TimePickerWrapper>
            )}
          </PickerContainer>
        )}
      </DateRangeContainer>
    </EventDateContainer>
  );
};

export default EventDate;
