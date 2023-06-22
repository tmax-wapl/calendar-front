import TimePickerContainer from '../components/TimePicker';
import { DateTime } from 'luxon';

interface Props {
  value?: DateTime;
  height?: number;
  onChange?: (time: DateTime) => void;
  onOutsideClick?: () => void;
}

export const TimePicker: React.FC<Props> = ({ value, height, onChange, onOutsideClick }: Props) => {
  return <TimePickerContainer value={value} height={height} onChange={onChange} onOutsideClick={onOutsideClick} />;
};

TimePicker.displayName = 'TimePicker';
