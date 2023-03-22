import React, { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import { Options, Weekday } from 'rrule';
import { Icon, Tooltip, Checkbox } from '@wapl/ui';
import {
  RepeatInfoContainer,
  ItemContainer,
  RepeatIntervalInput,
  PickerContainer,
  DateWrapper,
  DatePickerWrapper,
  RepeatDay,
} from './RepeatInfo.style';
import Select from '../Select/Select';
import DatePicker from '../DatePicker/DatePicker';
import { getRepeatSummary } from '@/utils';

interface Props {
  rrule?: Partial<Options>;
  startDate?: DateTime;
  defaultEndDate?: DateTime;
  repeatEndDate?: DateTime;
  onRRuleChange?: (value: Partial<Options>) => void;
  onStartChange?: (value?: DateTime) => void;
  onEndChange?: (value?: DateTime) => void;
}

const RepeatInfo = ({
  rrule,
  startDate,
  defaultEndDate,
  repeatEndDate,
  onRRuleChange,
  onStartChange,
  onEndChange,
}: Props) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);
  const dayOfWeek = ['월', '화', '수', '목', '금', '토', '일'];
  const byweekday = (rrule?.byweekday as Weekday[])?.map(({ weekday }) => weekday);
  const units = ['년', '개월', '주', '일'];
  const repeatItems = [
    { label: '반복 안 함', value: -1 },
    { label: '매일', value: 3 },
    { label: '매주', value: 2 },
    { label: '매월', value: 1 },
    { label: '매년', value: 0 },
  ];

  const handleSelectChange = (freq: number) => {
    onRRuleChange({
      ...(freq > -1 && { interval: 1, freq }),
      ...(freq === 2 && { byweekday: [startDate.weekday - 1] }),
    });
    onStartChange(freq > -1 ? startDate : undefined);
    onEndChange();
  };

  const handleIntervalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const interval = Number(e.target.value);
    if (isNaN(interval) || interval > 999 || (rrule.freq !== 3 && interval > 99)) return;
    onRRuleChange({ ...rrule, interval });
  };

  const handleCheckboxChange = (_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    if (checked) onEndChange(defaultEndDate || DateTime.now());
    else {
      onEndChange();
      setIsDatePickerOpen(false);
    }
  };

  const handleEndDateClick = () => {
    setIsDatePickerOpen(prev => !prev);
  };

  const handleEndDateChange = (selectedDate: DateTime) => {
    onEndChange(selectedDate);
  };

  const handleDayClick = (index: number) => {
    if (!byweekday.includes(index)) {
      onRRuleChange({ ...rrule, byweekday: [...byweekday, index].sort() });
      return;
    }
    if (byweekday.length === 1) {
      onRRuleChange({ ...rrule, byweekday: [startDate.weekday - 1] });
      return;
    }
    onRRuleChange({ ...rrule, byweekday: byweekday.filter(weekday => weekday !== index) });
  };

  useEffect(() => {
    if (rrule?.freq > -1) onStartChange(startDate);
  }, [startDate]);

  return (
    <RepeatInfoContainer>
      <ItemContainer>
        <Icon.RepeatLine className="mr-8" width={20} height={20} />
        <Select value={rrule?.freq || -1} items={repeatItems} onChange={handleSelectChange} />
      </ItemContainer>
      {rrule?.freq > -1 && (
        <>
          <ItemContainer height="32" style={{ fontSize: '13px', color: '#80868b' }}>
            {getRepeatSummary(rrule)}
          </ItemContainer>
          <ItemContainer>
            <RepeatIntervalInput value={rrule.interval} onChange={handleIntervalChange} />
            &nbsp;{units[rrule.freq]} 간격 반복
          </ItemContainer>
          <ItemContainer height="32">
            <Checkbox checked={!!repeatEndDate} checkboxSize={20} onChange={handleCheckboxChange} />
            &nbsp;&nbsp;종료 날짜
            {repeatEndDate && (
              <PickerContainer>
                <Tooltip
                  disableHoverListener={startDate <= repeatEndDate}
                  placement="top"
                  title="시작일과 같거나 이후로 설정해 주세요."
                  sx={{ '.MuiTooltip-tooltip': { maxWidth: '250px' } }}
                >
                  <DateWrapper
                    className={`${isDatePickerOpen ? 'selected' : ''}`}
                    isInvalid={startDate > repeatEndDate}
                    onClick={handleEndDateClick}
                  >
                    {repeatEndDate.toFormat('yyyy.LL.dd')}
                    <Icon.CalendarLine className="ml-4" width={16} height={16} />
                  </DateWrapper>
                </Tooltip>

                {isDatePickerOpen && (
                  <DatePickerWrapper>
                    <DatePicker
                      date={repeatEndDate}
                      onDateClick={handleEndDateChange}
                      onOutsideClick={handleEndDateClick}
                    />
                  </DatePickerWrapper>
                )}
              </PickerContainer>
            )}
          </ItemContainer>
          {rrule?.freq === 2 && (
            <ItemContainer>
              {dayOfWeek.map((day, index) => {
                return (
                  <RepeatDay
                    key={day}
                    className={`${byweekday.includes(index) ? 'select' : ''}`}
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
