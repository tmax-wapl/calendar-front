import { DateTime } from 'luxon';
import { useState } from 'react';
import DateSpinnerPickerCompo from '../components/DateSpinnerPicker';

interface DatePickerProps {
  open?: boolean;
  title: string;
  date?: Date;
  onChange?: (selectedDate: Date) => void;
  onOutsideClick?: () => void;
}

export const DateSpinnerPicker = ({ open = false, title, date, onChange, onOutsideClick }: DatePickerProps) => {
  const [value, setValue] = useState(DateTime.fromJSDate(date));

  const handleDateChange = (date: DateTime) => {
    if (onChange) onChange(date.toJSDate());
    setValue(date);
  };
  return open ? (
    <DateSpinnerPickerCompo
      title={title}
      date={value}
      onDateChange={handleDateChange}
      onOutsideClick={onOutsideClick}
    />
  ) : null;
};
