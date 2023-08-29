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
  mode?: 'default' | 'hour' /** default: 기존 모드 / hour: 시간 선택 모드 */;
}

export const TimePicker: React.FC<Props> = ({ value, height, onChange, style, mode = 'default' }: Props) => {
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
          <TimeValue>{date.toFormat(mode === 'hour' ? 'h:00' : 'h:mm')}</TimeValue>
        </TimeWrapper>
        {isTimePickerOpen && (
          <TimePickerWrapper style={{ right: 'initial' }}>
            <TimePickerContainer
              value={date}
              height={height}
              onChange={handleChange}
              onOutsideClick={handleTimeClick}
              mode={mode}
            />
          </TimePickerWrapper>
        )}
      </PickerContainer>
    </WaplUiProvider>
  );
};

TimePicker.displayName = 'TimePicker';
