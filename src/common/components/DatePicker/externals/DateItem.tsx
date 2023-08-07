import React, { CSSProperties, useState } from 'react';
import { Icon, styled, Tooltip, WaplUiProvider } from '@wapl/ui';
import { DateTime } from 'luxon';
import { DateWrapper, DatePickerWrapper } from '../../EventInfoItem/EventDateItem.style';
import DatePicker from '../components/DatePicker';

interface Props {
  date: Date;
  isDateInvalid?: boolean;
  inValidTitle?: string;
  onChange?: (date: Date) => void;
  isMasked?: boolean;
  dateFormat?: 'yyyy.LL.dd' | 'yyyy.mm.dd' | 'yyyy-LL-dd' | 'dd/LL/yyyy' | 'dd/mm/aaaa';
  style?: CSSProperties;
}

export const DateItem: React.FC<Props> = ({
  date,
  isDateInvalid,
  inValidTitle,
  onChange,
  isMasked,
  dateFormat = 'yyyy.LL.dd',
  style,
}: Props) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);
  const [value, setValue] = useState<DateTime>(DateTime.fromJSDate(date));

  const handleDateClick = () => {
    setIsDatePickerOpen(prev => !prev);
  };

  const handleDateChange = (date: DateTime) => {
    setValue(date);
    if (onChange) onChange(date.toJSDate());
  };

  const validFormat = () => {
    switch (dateFormat) {
      case 'dd/mm/aaaa':
        return value.toFormat('dd/LL/yyyy');
      case 'yyyy.mm.dd':
        return value.toFormat('yyyy.LL.dd');
      default:
        return value.toFormat(dateFormat);
    }
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
            isMasked={isMasked}
            onClick={handleDateClick}
            style={style}
          >
            {isMasked ? dateFormat : validFormat()}
            <span style={{ display: 'flex', marginLeft: '4px' }}>
              <Icon.CalendarLine width={16} height={16} />
            </span>
          </DateWrapper>
        </Tooltip>
        {isDatePickerOpen && (
          <DatePickerWrapper allDay>
            <DatePicker date={value} onDateClick={handleDateChange} onOutsideClick={handleDateClick} />
          </DatePickerWrapper>
        )}
      </PickerContainer>
    </WaplUiProvider>
  );
};

DateItem.displayName = 'DateItem';

const PickerContainer = styled.div`
  display: flex;
  position: relative;
  ${({ theme: { Font } }) => Font.Text.s.Regular};
`;
