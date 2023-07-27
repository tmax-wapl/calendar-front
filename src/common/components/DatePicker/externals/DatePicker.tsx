import React, { CSSProperties, ReactNode } from 'react';
import { WaplUiProvider } from '@wapl/ui';
import { DateTime } from 'luxon';
import { PickerContainer, DatePickerWrapper } from '../../EventInfoItem/EventDateItem.style';
import { DatePickerWrapper as DatePickerInlineWrapper } from '@/mobile/components/RepeatInfo.style';
import DatePickerCompo from '../components/DatePicker';

interface Props {
  open?: boolean /** DatePicker의 열림 닫힘 여부 (inline일 경우 제외) */;
  date: Date /** 선택 된 Date */;
  mode?: 'modal' | 'inline' /** 기본 Picker 형태는 modal, inline일 경우 컴포넌트 내부로 사용 가능 */;
  onDateChange?: (date: Date) => void /** '일' 선택 시 선택 된 '일'의 Date 객체 반환 */;
  onChange?: (date: Date) => void /** '년도/월' 변경 시 현재 '년도/월'의 Date 객체 반환 */;
  onOutsideClick?: () => void /** 바깥 영역 선택시 DatePicker 닫힌 후 콜백 */;
  disabledDateList?: string[] /** disabled 처리하고 싶은 날짜 목록 (ex: ['2023-07-23', '2023-07-28']) */;
  style?: CSSProperties;
}

export const DatePicker: React.FC<Props> = ({
  open,
  date,
  mode = 'modal',
  onDateChange,
  onChange,
  onOutsideClick,
  disabledDateList,
  style,
}: Props) => {
  const handleDateChange = (date: DateTime) => {
    if (onDateChange) onDateChange(date.toJSDate());
  };

  const Wrapper = ({ children }: { children: ReactNode }) =>
    mode === 'modal' ? (
      open && (
        <DatePickerWrapper allDay style={style}>
          {children}
        </DatePickerWrapper>
      )
    ) : (
      <DatePickerInlineWrapper style={style}>{children}</DatePickerInlineWrapper>
    );

  return (
    <WaplUiProvider>
      <PickerContainer>
        <Wrapper>
          <DatePickerCompo
            date={DateTime.fromJSDate(date)}
            onDateClick={handleDateChange}
            onOutsideClick={onOutsideClick}
            onChange={onChange}
            disabledDateList={disabledDateList}
          />
        </Wrapper>
      </PickerContainer>
    </WaplUiProvider>
  );
};

DatePicker.displayName = 'DatePicker';
