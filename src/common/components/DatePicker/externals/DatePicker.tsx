import React from 'react';
import { WaplUiProvider } from '@wapl/ui';
import { DateTime } from 'luxon';
import { PickerContainer, DatePickerWrapper } from '../../EventInfoItem/EventDateItem.style';
import DatePickerCompo from '../components/DatePicker';

interface Props {
  open: boolean;
  date: Date;
  onChange?: (date: Date) => void;
  onOutsideClick?: () => void;
}

export const DatePicker: React.FC<Props> = ({ open, date, onOutsideClick, onChange }: Props) => {
  const handleDateChange = (date: DateTime) => {
    if (onChange) onChange(date.toJSDate());
  };

  return (
    <WaplUiProvider>
      <PickerContainer>
        {open && (
          <DatePickerWrapper allDay>
            <DatePickerCompo
              date={DateTime.fromJSDate(date)}
              onDateClick={handleDateChange}
              onOutsideClick={onOutsideClick}
            />
          </DatePickerWrapper>
        )}
      </PickerContainer>
    </WaplUiProvider>
  );
};

DatePicker.displayName = 'DatePicker';
