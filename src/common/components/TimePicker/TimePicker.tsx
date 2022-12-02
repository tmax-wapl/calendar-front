import { useState, useCallback, useEffect } from 'react';
import { DateTime } from 'luxon';
import { TimePickerContainer } from './TimePicker.style';
import PickerItem from './PickerItem';

interface Props {
  meridiem?: string;
  hour?: string;
  minute?: string;
  height?: number;
  onChange?: (time: DateTime) => void;
}

const TimePicker = ({ meridiem = '오전', hour = '9', minute = '00', height = 200, onChange }: Props) => {
  const [selectedMeridiem, setSelectedMeridiem] = useState<string>(meridiem);
  const [selectedHour, setSelectedHour] = useState<string>(hour);
  const [selectedMinute, setSelectedMinute] = useState<string>(minute);
  const ampm = ['오전', '오후'];
  const hours = ['12', ...Array.from(Array(11), (_, i) => `${i + 1}`)];
  const minutes = Array.from(Array(60), (_, i) => ('00' + i).slice(-2));

  const handleMeridiemClick = useCallback((meridiem: string) => setSelectedMeridiem(meridiem), []);
  const handleHourClick = useCallback((hour: string) => setSelectedHour(hour), []);
  const handleMinuteClick = useCallback((minute: string) => setSelectedMinute(minute), []);

  useEffect(() => {
    if (!onChange) return;
    onChange(DateTime.fromFormat(`${selectedMeridiem} ${selectedHour}:${selectedMinute}`, 'a h:mm', { locale: 'ko' }));
  }, [selectedMeridiem, selectedHour, selectedMinute]);

  return (
    <TimePickerContainer height={height}>
      <PickerItem height={height} item={ampm} selectedValue={selectedMeridiem} onValueClick={handleMeridiemClick} />
      <PickerItem height={height} item={hours} selectedValue={selectedHour} onValueClick={handleHourClick} isInfinite />
      <PickerItem
        height={height}
        item={minutes}
        selectedValue={selectedMinute}
        onValueClick={handleMinuteClick}
        isInfinite
      />
    </TimePickerContainer>
  );
};

export default TimePicker;
