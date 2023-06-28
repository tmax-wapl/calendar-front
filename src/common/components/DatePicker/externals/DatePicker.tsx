import React, { CSSProperties } from 'react';
import { WaplUiProvider } from '@wapl/ui';
import { DateTime } from 'luxon';
import { PickerContainer, DatePickerWrapper } from '../../EventInfoItem/EventDateItem.style';
import DatePickerCompo from '../components/DatePicker';

interface Props {
  open: boolean /** DatePicker의 열림 닫힘 여부 */;
  date: Date /** 선택 된 Date */;
  onDateChange?: (date: Date) => void /** '일' 선택 시 선택 된 '일'의 Date 객체 반환 */;
  onChange?: (date: Date) => void /** '년도/월' 변경 시 현재 '년도/월'의 Date 객체 반환 */;
  onOutsideClick?: () => void /** 바깥 영역 선택시 DatePicker 닫힌 후 콜백 */;
  style?: CSSProperties;
}

export const DatePicker: React.FC<Props> = ({ open, date, onDateChange, onChange, onOutsideClick, style }: Props) => {
  const handleDateChange = (date: DateTime) => {
    if (onDateChange) onDateChange(date.toJSDate());
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
              onChange={onChange}
            />
          </DatePickerWrapper>
        )}
      </PickerContainer>
    </WaplUiProvider>
  );
};

DatePicker.displayName = 'DatePicker';
