import React, { useState } from 'react';
import { DateTime } from 'luxon';
import { Icon, Select, Checkbox } from '@wapl/ui';
import {
  RepeatInfoContainer,
  ItemContainer,
  RepeatIntervalInput,
  PickerContainer,
  DateWrapper,
  DatePickerWrapper,
  RepeatDay,
} from './RepeatInfo.style';
import DatePicker from '../DatePicker/DatePicker';

interface Props {
  repeatTime?: string;
  repeatUnit?: string;
  repeatEndDate?: DateTime;
  defaultEndDate?: DateTime;
  repeatDays?: boolean[];
  onChange: ({ value }: { [key: string]: string | DateTime | boolean[] }) => void;
}

interface Unit {
  [key: string]: string;
}

const RepeatInfo = ({ repeatTime, repeatUnit, repeatEndDate, defaultEndDate, repeatDays, onChange }: Props) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);
  const days = ['월', '화', '수', '목', '금', '토', '일'];

  const repeatItems = [
    { label: '반복 안 함', value: '' },
    { label: '매일', value: 'd' },
    { label: '매주', value: 'w' },
    { label: '매월', value: 'm' },
    { label: '매년', value: 'y' },
  ];
  const units: Unit = {
    d: '일',
    w: '주',
    m: '월',
    y: '년',
  }; // TODO: RRULE 형식과 맞추기

  const handleSelectChange = (item: string) => {
    if (!onChange) return;
    onChange({
      repeatTime: '1',
      repeatUnit: item,
      repeatEndDate: undefined,
      repeatDays: item === 'w' ? [...Array(7)].map((_, index) => index === DateTime.now().weekday - 1) : undefined,
    });
  };

  const getRepeatSummary = () => {
    return `${repeatTime || 1}${units[repeatUnit]} 간격 ${
      repeatUnit === 'w'
        ? `${repeatDays.reduce((acc, day, index) => acc + (day ? days[index] + ' ' : ''), '')}반복`
        : ''
    }${repeatEndDate ? ` / ${repeatEndDate.toFormat('yyyy.LL.dd.')} 종료` : ''}`;
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ repeatTime: e.target.value });
  };

  const handleCheckboxChange = (_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    if (checked) onChange({ repeatEndDate: defaultEndDate || DateTime.now().plus({ years: 1 }) });
    else {
      onChange({ repeatEndDate: undefined });
      setIsDatePickerOpen(false);
    }
  };

  const handleEndDateClick = () => {
    setIsDatePickerOpen(prev => !prev);
  };

  const handleDayClick = (index: number) => {
    if (repeatDays[index] && repeatDays.filter(day => day).length === 1) {
      onChange({ repeatDays: repeatDays.map((_, index) => index === DateTime.now().weekday - 1) });
      return;
    }
    onChange({ repeatDays: repeatDays?.map((day, i) => (i === index ? !day : day)) });
  };

  return (
    <RepeatInfoContainer>
      <ItemContainer>
        <Icon.RepeatLine className="mr-8" color="#202124" width={20} height={20} />
        <Select
          name="repeat"
          defaultValue={repeatUnit || ''}
          types="normal"
          items={repeatItems}
          width="100px"
          onChange={handleSelectChange}
        />
      </ItemContainer>
      {repeatUnit && (
        <>
          <ItemContainer height="32" style={{ fontSize: '13px', color: '#80868b' }}>
            {getRepeatSummary()}
          </ItemContainer>
          <ItemContainer>
            <RepeatIntervalInput value={repeatTime} onChange={handleTimeChange} />
            &nbsp;{units[repeatUnit]} 간격 반복
          </ItemContainer>
          <ItemContainer height="32">
            <Checkbox checked={!!repeatEndDate} checkboxSize={20} onChange={handleCheckboxChange} />
            &nbsp;&nbsp;종료 날짜 선택
            {repeatEndDate && (
              <PickerContainer>
                <DateWrapper className={`${isDatePickerOpen ? 'selected' : ''}`} onClick={handleEndDateClick}>
                  {repeatEndDate.toFormat('yyyy.LL.dd')}
                  <Icon.CalendarLine className="ml-8" color="#202124" width={16} height={16} />
                </DateWrapper>
                {isDatePickerOpen && (
                  <DatePickerWrapper>
                    <DatePicker
                      size={0.85}
                      date={repeatEndDate}
                      onDateClick={selectedDate => onChange({ repeatEndDate: selectedDate })}
                    />
                  </DatePickerWrapper>
                )}
              </PickerContainer>
            )}
          </ItemContainer>
          {repeatUnit === 'w' && (
            <ItemContainer>
              {days.map((day, index) => {
                return (
                  <RepeatDay
                    key={day}
                    className={`${repeatDays[index] ? 'select' : ''}`}
                    onClick={() => handleDayClick(index)}
                  >
                    {day}
                  </RepeatDay>
                );
              })}
            </ItemContainer>
          )}
        </>
      )}
    </RepeatInfoContainer>
  );
};

export default RepeatInfo;
