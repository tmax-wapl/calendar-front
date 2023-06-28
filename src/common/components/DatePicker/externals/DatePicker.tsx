import React, { CSSProperties } from 'react';
import { WaplUiProvider } from '@wapl/ui';
import { DateTime } from 'luxon';
import { PickerContainer, DatePickerWrapper } from '../../EventInfoItem/EventDateItem.style';
import DatePickerCompo from '../components/DatePicker';

interface Props {
  open: boolean;
  date: Date;
  onChange?: (date: Date) => void;
  onOutsideClick?: () => void;
  style?: CSSProperties;
  onPrevClick?: () => void;
  onNextClick?: () => void;
  prevDisabled?: boolean;
  nextDisabled?: boolean;
}

export const DatePicker: React.FC<Props> = ({
  open,
  date,
  onOutsideClick,
  onChange,
  onPrevClick,
  onNextClick,
  prevDisabled,
  nextDisabled,
  style,
}: Props) => {
  const handleDateChange = (date: DateTime) => {
    if (onChange) onChange(date.toJSDate());
  };

  return (
    <WaplUiProvider>
      <PickerContainer>
        {open && (
          <DatePickerWrapper allDay style={style}>
            <DatePickerCompo
              date={DateTime.fromJSDate(date)}
              onDateClick={handleDateChange}
              onOutsideClick={onOutsideClick}
              onPrevClick={onPrevClick}
              onNextClick={onNextClick}
              prevDisabled={prevDisabled}
              nextDisabled={nextDisabled}
            />
          </DatePickerWrapper>
        )}
      </PickerContainer>
    </WaplUiProvider>
  );
};

DatePicker.displayName = 'DatePicker';
