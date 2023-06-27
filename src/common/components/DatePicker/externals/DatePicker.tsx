import React, { useState } from 'react';
import { Icon, Tooltip, WaplUiProvider } from '@wapl/ui';
import { DateTime } from 'luxon';
import { PickerContainer, DateWrapper, DatePickerWrapper } from '../../EventInfoItem/EventDateItem.style';
import DatePickerCompo from '../components/DatePicker';

interface Props {
  date: DateTime;
  allDay?: boolean;
  isDateInvalid?: boolean;
  inValidTitle?: string;
  onChange?: (date: DateTime) => void;
}

export const DatePicker: React.FC<Props> = ({ date, allDay, isDateInvalid, inValidTitle, onChange }: Props) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);

  const handleDateClick = () => {
    setIsDatePickerOpen(prev => !prev);
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
            {date.toFormat('yyyy.LL.dd')}
            <span style={{ display: 'flex', marginLeft: '4px' }}>
              <Icon.CalendarLine width={16} height={16} />
            </span>
          </DateWrapper>
        </Tooltip>
        {isDatePickerOpen && (
          <DatePickerWrapper allDay={allDay}>
            <DatePickerCompo date={date} onDateClick={onChange} onOutsideClick={handleDateClick} />
          </DatePickerWrapper>
        )}
      </PickerContainer>
    </WaplUiProvider>
  );
};

DatePicker.displayName = 'DatePicker';
