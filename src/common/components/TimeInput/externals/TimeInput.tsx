import { useState } from 'react';
import { DateTime } from 'luxon';
import TimeInputCompo from '../components/TimeInput';

interface Props {
  value: Date;
  height?: number;
  onChange?: (time: Date) => void;
  invalidTime?: boolean;
}

export const TimeInput = ({ value, height = 200, onChange, invalidTime }: Props) => {
  const [date, setDate] = useState(DateTime.fromJSDate(value));

  const handleChange = (time: DateTime) => {
    if (onChange) onChange(time.toJSDate());
    setDate(time);
  };

  return <TimeInputCompo date={date} height={height} handleChange={handleChange} invalidTime={invalidTime} />;
};

TimeInput.displayName = 'TimeInput';
