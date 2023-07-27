import { CSSProperties, useState } from 'react';
import TimePickerContainer from '../components/TimePicker';
import { DateTime } from 'luxon';
import { PickerContainer, TimePickerWrapper, TimeValue, TimeWrapper } from '../../EventInfoItem/EventDateItem.style';
import { WaplUiProvider } from '@wapl/ui';

interface Props {
  value?: Date;
  height?: number;
  onChange?: (time: Date) => void /** 시간 선택시 Date 객체 반환 */;
  style?: CSSProperties;
}

export const TimePicker: React.FC<Props> = ({ value, height, onChange, style }: Props) => {
  const [isTimePickerOpen, setIsTimePickerOpen] = useState<boolean>(false);
  const [date, setDate] = useState(DateTime.fromJSDate(value));

  const handleChange = (time: DateTime) => {
    if (onChange) onChange(time.toJSDate());
    setDate(time);
  };

  const handleTimeClick = () => {
    setIsTimePickerOpen(prev => !prev);
  };

  return (
    <WaplUiProvider>
      <PickerContainer style={style}>
        <TimeWrapper style={{ background: isTimePickerOpen ? 'rgba(0, 0, 0, 0.06)' : '' }} onClick={handleTimeClick}>
          <TimeValue>{date.toFormat('a', { locale: 'ko' })}</TimeValue>
          <TimeValue>{date.toFormat('h:mm')}</TimeValue>
        </TimeWrapper>
        {isTimePickerOpen && (
          <TimePickerWrapper style={{ right: 'initial' }}>
            <TimePickerContainer
              value={date}
              height={height}
              onChange={handleChange}
              onOutsideClick={handleTimeClick}
            />
          </TimePickerWrapper>
        )}
      </PickerContainer>
    </WaplUiProvider>
  );
};

TimePicker.displayName = 'TimePicker';
