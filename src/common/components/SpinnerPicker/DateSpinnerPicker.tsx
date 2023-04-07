import { useState } from 'react';
import { DateTime } from 'luxon';
import { ContextMenu, ContentMenuHeader } from '@wapl/ui';
import SpinnerPickerItem from './SpinnerPickerItem';
import { PickerContainer, ButtonWrapper, Selected, StyledButton } from './DateSpinnerPicker.style';
import { useDidMountEffect } from '@/common/hooks';

interface DatePickerProps {
  date?: DateTime;
  onDateChange?: (selectedDate: DateTime) => void;
  onOutsideClick?: () => void;
}

const DateSpinnerPicker = ({ date = DateTime.now(), onDateChange, onOutsideClick }: DatePickerProps) => {
  const [year, setYear] = useState<string>(`${date.year}년`);
  const [month, setMonth] = useState<string>(`${date.month}월`);
  const [day, setDay] = useState<string>(`${date.day}일`);
  const years = Array.from(Array(200), (_, i) => `${i + DateTime.now().year - 100}년`);
  const months = Array.from(Array(12), (_, i) => `${i + 1}월`);
  const [days, setDays] = useState<string[]>(
    Array.from(Array(new Date(date.year, date.month, 0).getDate()), (_, i) => `${i + 1}일`),
  );

  useDidMountEffect(() => {
    const newDate = new Date(+year.slice(0, -1), +month.slice(0, -1), 0).getDate();
    if (days.length !== newDate) {
      setDays(Array.from(Array(newDate), (_, i) => `${i + 1}일`));
      if (newDate < +day.slice(0, -1)) setDay(`${newDate}일`);
    }
  }, [year, month]);

  const handleDateChange = () => {
    if (!onDateChange) return;
    onDateChange(date.set({ year: +year.slice(0, -1), month: +month.slice(0, -1), day: +day.slice(0, -1) }));
    onOutsideClick();
  };

  const handleYearChange = (index: number) => setYear(years[index]);
  const handleMonthChange = (index: number) => setMonth(months[index]);
  const handleDayChange = (index: number) => setDay(days[index]);

  return (
    <ContextMenu open>
      <ContentMenuHeader>캘린더 날짜 선택</ContentMenuHeader>
      <PickerContainer id="itemContainer">
        <Selected id="selectedDiv" />
        <SpinnerPickerItem height={108} item={years} selectedValue={year} onValueChange={handleYearChange} />
        <SpinnerPickerItem height={108} item={months} selectedValue={month} onValueChange={handleMonthChange} />
        <SpinnerPickerItem height={108} item={days} selectedValue={day} onValueChange={handleDayChange} />
      </PickerContainer>
      <ButtonWrapper>
        <StyledButton variant="secondary" size="medium" onClick={onOutsideClick}>
          취소
        </StyledButton>
        <StyledButton variant="primary" size="medium" onClick={handleDateChange}>
          이동
        </StyledButton>
      </ButtonWrapper>
    </ContextMenu>
  );
};

export default DateSpinnerPicker;
