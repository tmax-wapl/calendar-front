import { ChangeEvent, FocusEvent, useCallback, useEffect, useRef, useState } from 'react';
import { DateTime } from 'luxon';
import { getDateTime, isValidDate } from '@/utils';
import { InputWrapper, InputArea } from './InputItem.style';
import { useDidMountEffect } from '@/common/hooks';

interface Props {
  value?: DateTime;
  onChange?: (time: DateTime) => void;
  type: 'time' | 'date';
  onPickerClose?: () => void;
}

const InputItem = ({ value, onChange, type = 'time', onPickerClose }: Props) => {
  const [date, setDate] = useState<string>(value.toFormat('yyyy.LL.dd'));
  const [time, setTime] = useState<string>(value.toFormat('h:mm'));
  const inputRef = useRef<HTMLInputElement | null>(null);
  const isTime = type === 'time';

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    isTime ? handleTimeChange(e) : handleDateChange(e);
  };

  const handleTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    let [hour, minute] = e.target.value.split(':');
    if (hour.length > 2) {
      minute = hour.slice(2) + minute;
      hour = hour.slice(0, 2).padStart(2, '0');
    }
    if (hour === '00' || hour === '24') hour = '12';
    if (minute && (minute.length > 2 || !/^(0?[0-9]|[1-5][0-9])$/.test(minute))) return;
    if (/^(0?[6-9])$/.test(minute)) minute = minute.padStart(2, '0');
    setTime(hour || minute ? `${hour ?? ''}:${minute ?? ''}` : '');
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    let [year, month, day] = value.split('.');

    if (value?.length > 10) return;
    if (year?.length > 4 || month?.length > 2 || day?.length > 2) return;

    const isYear = isValidLength(year, 4);
    const isMonth = isValidLength(month, 2);

    // TODO: year, month, day correct invalid check
    if (isYear && !month) {
      month = year.slice(4);
      year = year.slice(0, 4);
      value = `${year}.${month}${day ? `.${day}` : ''}`;
    }
    if (isYear && isMonth && !day) {
      day = month.slice(2);
      month = month.slice(0, 2);
      value = `${year}.${month}.${day}`;
    }

    setDate(value);
  };

  const handleSelcetionRange = (r: number) => {
    inputRef.current.setSelectionRange(r, r);
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const handleSubmit = () => {
    const [year, month, day] = date.split('.').map(Number);

    if (isValidDate(year, month, day)) onChange(value.set({ year, month, day }));
    else onChange(value);
    onPickerClose();
  };

  const isValidFormat = (v: string) => {
    return /^(0?[1-9]|1[0-2]):([0-5]?[0-9])$/.test(v);
  };

  const isValidLength = useCallback((val: string, len: number) => val?.length === len, []);

  useEffect(() => {
    const [hour, minute] = time.split(':');
    if (hour && !minute) handleSelcetionRange(hour.length);
    if (isValidFormat(time)) onChange(getDateTime('time', value, time));
    else onChange(value);
  }, [time]);

  useDidMountEffect(() => {
    if (!isTime) setDate(value.toFormat('yyyy.LL.dd'));
  }, [value]);

  return (
    <InputWrapper>
      <InputArea
        type="text"
        ref={inputRef}
        autoFocus
        onFocus={handleFocus}
        value={isTime ? time : date}
        onKeyDown={e => {
          (e.key === 'ArrowUp' || e.key === 'ArrowDown') && e.preventDefault();
          if (!isTime && (e.key === 'Enter' || e.key === 'NumPadEnter')) handleSubmit();
        }}
        onChange={handleChange}
      />
    </InputWrapper>
  );
};

export default InputItem;
