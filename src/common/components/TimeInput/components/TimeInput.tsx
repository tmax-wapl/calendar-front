import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DateTime } from 'luxon';
import { Tooltip } from '@wapl/ui';
import { getDateTime } from '@/utils';
import InputItem from './InputItem';
import TimeSelector from './TimeSelector';
import {
  PickerContainer,
  TimeWrapper,
  TimeValue,
  MeridiemValueWrapper,
  TimeSelectorWrapper,
  TimeValueWrapper,
  TimeInputWrapper,
} from './TimeInput.style';

interface Props {
  date: DateTime;
  height?: number;
  handleChange: (time: DateTime) => void;
  invalidTime?: boolean;
  invalidTitle?: string;
}

export const TimeInput = ({ date, height = 200, handleChange, invalidTime, invalidTitle }: Props) => {
  const meridiemValueRef = useRef<HTMLDivElement | null>(null);
  const timeValueRef = useRef<HTMLDivElement | null>(null);
  const [isTooltipOpen, setIsTooltipOpen] = useState<boolean>(false);
  const [isTimeSelectorOpen, setIsTimeSelectorOpen] = useState<boolean>(false);
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

  const handleMeridiemClick = () => {
    const meridiem = meridiemValue === '오전' ? '오후' : '오전';
    handleChange(getDateTime('meridiem', date, meridiem));
  };

  const handleTimeClick = () => {
    setIsTimeSelectorOpen(prev => !prev);
  };

  return (
    <PickerContainer>
      <Tooltip
        open={invalidTime && isTooltipOpen}
        onMouseEnter={() => setIsTooltipOpen(true)}
        onMouseLeave={() => setIsTooltipOpen(false)}
        disableHoverListener={!invalidTime}
        disableFocusListener={!invalidTime}
        placement="top-end"
        title={invalidTitle}
        sx={{ '.MuiTooltip-tooltip': { maxWidth: '250px' } }}
      >
        <TimeWrapper isInvalid={invalidTime}>
          <MeridiemValueWrapper onClick={handleMeridiemClick} ref={meridiemValueRef}>
            <TimeValue>{date.toFormat('a', { locale: 'ko' })}</TimeValue>
          </MeridiemValueWrapper>
          {isTimeSelectorOpen ? (
            <TimeInputWrapper ref={timeValueRef}>
              <InputItem onChange={handleChange} value={date} />
            </TimeInputWrapper>
          ) : (
            <TimeValueWrapper onClick={handleTimeClick} ref={timeValueRef}>
              <TimeValue>{date.toFormat('h:mm')}</TimeValue>
            </TimeValueWrapper>
          )}
        </TimeWrapper>
      </Tooltip>
      <TimeSelectorWrapper>
        {isTimeSelectorOpen && (
          <TimeSelector
            type="time"
            height={height}
            exceptClickRef={timeValueRef}
            value={date}
            currentValue={timeCurrentValue}
            selectedValue={timeSelectValue}
            item={timeList}
            isInfinite={true}
            onChange={handleChange}
            onOutsideClick={handleTimeClick}
          />
        )}
      </TimeSelectorWrapper>
    </PickerContainer>
  );
};

export default TimeInput;
