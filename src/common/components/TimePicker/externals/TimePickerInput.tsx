import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DateTime } from 'luxon';
import {
  PickerContainer,
  TimeWrapper,
  TimeValue,
  MeridiemValueWrapper,
  TimeSelectorWrapper,
  TimeValueWrapper,
} from '../../TimeInput/components/TimeInput.style';
import { WaplUiProvider } from '@wapl/ui';
import TimeSelector from '../../TimeInput/components/TimeSelector';
import TimeInput from '../../TimeInput/components/TimeInput';
import { getDateTime } from '@/utils';

interface Props {
  value: Date;
  height?: number;
  onChange?: (time: Date) => void;
}

export const TimePickerInput: React.FC<Props> = ({ value, height, onChange }: Props) => {
  const [date, setDate] = useState(DateTime.fromJSDate(value));
  const [isTimeSelectorOpen, setIsTimeSelectorOpen] = useState<boolean>(false);
  const meridiemValueRef = useRef<HTMLDivElement | null>(null);
  const timeValueRef = useRef<HTMLDivElement | null>(null);
  const [meridiemValue, setMeridiemValue] = useState<string>();
  const [timeSelectValue, setTimeSelectValue] = useState<string>();
  const [timeCurrentValue, setTimeCurrentValue] = useState<string>(
    `${date.toFormat('h').padStart(2, '0')}:${date.toFormat('mm')}`,
  );

  const handleChange = (time: DateTime) => {
    onChange(time.toJSDate());
    setDate(time);
  };

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

  const handleMeridiemClick = () => {
    const meridiem = meridiemValue === '오전' ? '오후' : '오전';
    onChange(getDateTime('meridiem', date, meridiem).toJSDate());
    setDate(getDateTime('meridiem', date, meridiem));
  };

  const handleTimeClick = () => {
    setIsTimeSelectorOpen(prev => !prev);
  };

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

  useEffect(() => {
    setTimeSelectValue(getSelectValue(date));
    setTimeCurrentValue(getCurrentValue(date));
    setMeridiemValue(date.toFormat('a', { locale: 'ko' }));
  }, [date]);

  return (
    <WaplUiProvider>
      <PickerContainer>
        <TimeWrapper>
          <MeridiemValueWrapper onClick={handleMeridiemClick} ref={meridiemValueRef}>
            <TimeValue>{date.toFormat('a', { locale: 'ko' })}</TimeValue>
          </MeridiemValueWrapper>

          <TimeValueWrapper
            onClick={() => !isTimeSelectorOpen && handleTimeClick()}
            ref={timeValueRef}
            className={`${isTimeSelectorOpen ? 'selected' : ''}`}
          >
            {isTimeSelectorOpen ? (
              <TimeInput handleChange={handleChange} date={date} />
            ) : (
              <TimeValue>{date.toFormat('h:mm')}</TimeValue>
            )}
          </TimeValueWrapper>
        </TimeWrapper>

        <TimeSelectorWrapper className={`${isTimeSelectorOpen ? 'selected' : ''}`} style={{ zIndex: 2 }}>
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
              onChange={handleChange}
              onOutsideClick={handleTimeClick}
            />
          )}
        </TimeSelectorWrapper>
      </PickerContainer>
    </WaplUiProvider>
  );
};

TimePickerInput.displayName = 'TimePickerInput';
