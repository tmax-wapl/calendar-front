import { DateTime } from 'luxon';
import TimeSpinnerPickerCompo from '../components/TimeSpinnerPicker';

interface DatePickerProps {
  open?: boolean;
  title: string;
  date?: Date;
  onChange?: (selectedDate: Date) => void;
  onOutsideClick?: () => void;
}

export const TimeSpinnerPicker = ({ open = false, title, date, onChange, onOutsideClick }: DatePickerProps) => {
  const handleTimeChange = (date: DateTime) => {
    if (onChange) onChange(date.toJSDate());
  };

  return open ? (
    <TimeSpinnerPickerCompo
      title={title}
      date={DateTime.fromJSDate(date)}
      onTimeChange={handleTimeChange}
      onOutsideClick={onOutsideClick}
    />
  ) : null;
};
