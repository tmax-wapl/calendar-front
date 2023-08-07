import { ChangeEvent, FocusEvent, useEffect, useRef, useState } from 'react';
import { DateTime } from 'luxon';
import { getDateTime } from '@/utils';
import { InputWrapper, InputArea } from './InputItem.style';

interface Props {
  value?: DateTime;
  onChange?: (time: DateTime) => void;
}

const InputItem = ({ value, onChange }: Props) => {
  const [time, setTime] = useState<string>(value.toFormat('h:mm'));
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  const handleSelcetionRange = (r: number) => {
    inputRef.current.setSelectionRange(r, r);
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const isValidFormat = (v: string) => {
    return /^(0?[1-9]|1[0-2]):([0-5]?[0-9])$/.test(v);
  };

  useEffect(() => {
    const [hour, minute] = time.split(':');
    if (hour && !minute) handleSelcetionRange(hour.length);
    if (isValidFormat(time)) onChange(getDateTime('time', value, time));
    else onChange(value);
  }, [time]);

  return (
    <InputWrapper>
      <InputArea
        type="text"
        ref={inputRef}
        autoFocus
        onFocus={handleFocus}
        value={time}
        onKeyDown={e => {
          (e.key === 'ArrowUp' || e.key === 'ArrowDown') && e.preventDefault();
        }}
        onChange={handleChange}
      />
    </InputWrapper>
  );
};

export default InputItem;
