import { DateTime } from 'luxon';
import { CSSProperties, useState } from 'react';
import TimePicker from '../../TimePicker/components/TimePicker';
import { PickerContainer, TimePickerWrapper, TimeValue, TimeWrapper } from '../../EventInfoItem/EventDateItem.style';

interface Props {
  date: DateTime;
  isTimeInvalid?: boolean;
  onChange?: (date: DateTime) => void;
  style?: CSSProperties;
}

const TimeItemContainer = ({ date, isTimeInvalid, onChange, style }: Props) => {
  const [isTimePickerOpen, setIsTimePickerOpen] = useState<boolean>(false);

  const handleTimeClick = () => {
    setIsTimePickerOpen(prev => !prev);
  };

  return (
    <PickerContainer>
      <TimeWrapper
        className={`${isTimePickerOpen ? 'selected' : ''}`}
        isInvalid={isTimeInvalid}
        onClick={handleTimeClick}
      >
        <TimeValue>{date.toFormat('a', { locale: 'ko' })}</TimeValue>
        <TimeValue>{date.toFormat('h:mm')}</TimeValue>
      </TimeWrapper>
      {isTimePickerOpen && (
        <TimePickerWrapper style={style}>
          <TimePicker value={date} onChange={onChange} onOutsideClick={handleTimeClick} />
        </TimePickerWrapper>
      )}
    </PickerContainer>
  );
};

export default TimeItemContainer;
