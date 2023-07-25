import React, { useState } from 'react';
import { Icon, Tooltip, WaplUiProvider } from '@wapl/ui';
import { DateTime } from 'luxon';
import { PickerContainer, DateWrapper, DatePickerWrapper } from '../../EventInfoItem/EventDateItem.style';
import DatePicker from '../components/DatePicker';

interface Props {
  date: Date;
  isDateInvalid?: boolean;
  inValidTitle?: string;
  onChange?: (date: Date) => void;
  isMasked?: boolean;
  dateFormat?: 'yyyy.LL.dd' | 'yyyy-LL-dd' | 'dd/LL/yyyy';
}

export const DateItem: React.FC<Props> = ({
  date,
  isDateInvalid,
  inValidTitle,
  onChange,
  isMasked,
  dateFormat = 'yyyy.LL.dd',
}: Props) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);

  const handleDateClick = () => {
    setIsDatePickerOpen(prev => !prev);
  };

  const handleDateChange = (date: DateTime) => {
    if (onChange) onChange(date.toJSDate());
  };

  return (
    <WaplUiProvider>
      <PickerContainer>
        <Tooltip
          disableHoverListener={!isDateInvalid}
          placement="top"
          title={inValidTitle ?? '시작일과 같거나 이후로 설정해 주세요.'}
          sx={{ '.MuiTooltip-tooltip': { maxWidth: '250px' } }}
        >
          <DateWrapper
            className={`${isDatePickerOpen ? 'selected' : ''}`}
            isInvalid={isDateInvalid}
            onClick={handleDateClick}
          >
            {isMasked ? dateFormat.replace(/[^/.]/g, '-') : DateTime.fromJSDate(date).toFormat(dateFormat)}
            <span style={{ display: 'flex', marginLeft: '4px' }}>
              <Icon.CalendarLine width={16} height={16} />
            </span>
          </DateWrapper>
        </Tooltip>
        {isDatePickerOpen && (
          <DatePickerWrapper allDay>
            <DatePicker
              date={DateTime.fromJSDate(date)}
              onDateClick={handleDateChange}
              onOutsideClick={handleDateClick}
            />
          </DatePickerWrapper>
        )}
      </PickerContainer>
    </WaplUiProvider>
  );
};

DateItem.displayName = 'DateItem';
