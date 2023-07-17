import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DateTime } from 'luxon';
import { Icon, Tooltip } from '@wapl/ui';
import { getDateTime } from '@/utils';
import {
  EventDateItemContainer,
  PickerContainer,
  DateWrapper,
  DatePickerWrapper,
  TimeWrapper,
  TimeValue,
  MeridiemValueWrapper,
  TimeSelectorWrapper,
  TimeValueWrapper,
} from './EventDateItemInput.style';
import DatePicker from '../DatePicker/components/DatePicker';
import TimeSelector from '../TimePicker/components/TimeSelector';
import TimeInput from '../TimePicker/components/TimeInput';

interface Props {
  title?: string;
  date: DateTime;
  allDay?: boolean;
  isDateInvalid?: boolean;
  isTimeInvalid?: boolean;
  onChange?: (date: DateTime) => void;
}

const EventDateItemInput = ({ title, date, allDay, isDateInvalid, isTimeInvalid, onChange }: Props) => {
  const meridiemValueRef = useRef<HTMLDivElement | null>(null);
  const timeValueRef = useRef<HTMLDivElement | null>(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);
  const [isTimeSelectorOpen, setIsTimeSelectorOpen] = useState<boolean>(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState<boolean>(false);
  const [meridiemValue, setMeridiemValue] = useState<string>();
  const [timeSelectValue, setTimeSelectValue] = useState<string>();
  const [timeCurrentValue, setTimeCurrentValue] = useState<string>(
    `${date.toFormat('h').padStart(2, '0')}:${date.toFormat('mm')}`,
  );

  const timeToString = (hour: number, minute: number) => {
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  };

  const timeList = useMemo(() => {
    const timeSlots: string[] = [];
    for (let hour = 1; hour <= 12; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        timeSlots.push(timeToString(hour, minute));
      }
    }
    return timeSlots;
  }, []);

  const getSelectValue = useCallback((value: DateTime) => {
    const hour = Number(value.toFormat('h'));
    const minute = Number(value.toFormat('mm'));
    const targetMinute = minute % 15 ? minute + 15 - (minute % 15) : minute;
    return timeToString(
      targetMinute === 60 ? ((hour + 1) % 12 ? (hour + 1) % 12 : 12) : hour,
      targetMinute % 60 ? targetMinute : 0,
    );
  }, []);

  const getCurrentValue = useCallback((value: DateTime) => {
    return `${value.toFormat('h').padStart(2, '0')}:${value.toFormat('mm').padStart(2, '0')}`;
  }, []);

  useEffect(() => {
    setTimeSelectValue(getSelectValue(date));
    setTimeCurrentValue(getCurrentValue(date));
    setMeridiemValue(date.toFormat('a', { locale: 'ko' }));
  }, [date]);

  const handleDateClick = () => {
    setIsDatePickerOpen(prev => !prev);
  };

  const handleMeridiemClick = () => {
    const meridiem = meridiemValue === '오전' ? '오후' : '오전';
    onChange(getDateTime('meridiem', date, meridiem));
  };

  const handleTimeClick = () => {
    setIsTimeSelectorOpen(prev => !prev);
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
            <Icon.CalendarLine className="ml-4" width={16} height={16} />
          </DateWrapper>
        </Tooltip>
        {isDatePickerOpen && (
          <DatePickerWrapper allDay={allDay}>
            <DatePicker date={date} onDateClick={onChange} onOutsideClick={handleDateClick} />
          </DatePickerWrapper>
        )}
      </PickerContainer>
      {!allDay && (
        <PickerContainer>
          <Tooltip
            open={isTimeInvalid && isTooltipOpen}
            onMouseEnter={() => setIsTooltipOpen(true)}
            onMouseLeave={() => setIsTooltipOpen(false)}
            disableHoverListener={!isTimeInvalid}
            disableFocusListener={!isTimeInvalid} // 입력할 때 focus 이벤트에 반응 방지
            placement="top-end"
            title="시작일과 같거나 이후로 설정해 주세요."
            sx={{ '.MuiTooltip-tooltip': { maxWidth: '250px' } }}
          >
            <TimeWrapper isInvalid={isTimeInvalid}>
              <MeridiemValueWrapper onClick={handleMeridiemClick} ref={meridiemValueRef}>
                <TimeValue>{date.toFormat('a', { locale: 'ko' })}</TimeValue>
              </MeridiemValueWrapper>

              <TimeValueWrapper
                onClick={() => !isTimeSelectorOpen && handleTimeClick()}
                ref={timeValueRef}
                className={`${isTimeSelectorOpen ? 'selected' : ''}`}
              >
                {isTimeSelectorOpen ? (
                  <TimeInput onChange={onChange} value={date}></TimeInput>
                ) : (
                  <TimeValue>{date.toFormat('h:mm')}</TimeValue>
                )}
              </TimeValueWrapper>
            </TimeWrapper>
          </Tooltip>

          <TimeSelectorWrapper className={`${isTimeSelectorOpen ? 'selected' : ''}`}>
            {isTimeSelectorOpen && (
              <TimeSelector
                type="time"
                height={160}
                exceptClickRef={timeValueRef}
                value={date}
                currentValue={timeCurrentValue}
                selectedValue={timeSelectValue}
                item={timeList}
                isInfinite={true}
                onChange={onChange}
                onOutsideClick={handleTimeClick}
              />
            )}
          </TimeSelectorWrapper>
        </PickerContainer>
      )}
    </EventDateItemContainer>
  );
};

export default EventDateItemInput;
