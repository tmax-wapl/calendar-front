import { useState } from 'react';
import { DateTime } from 'luxon';
import { Icon } from '@wapl/ui';
import {
  HeaderContainer,
  TitleWrapper,
  TextButton,
  IconButton,
  CalendarPickerButtonWrapper,
} from './DatePickerHeader.style';
import TitlePicker from './TitlePicker';

interface DatePickerHeaderProps {
  size?: number;
  selectedDate: DateTime;
  titleDate: DateTime;
  setTitleDate: React.Dispatch<React.SetStateAction<DateTime>>;
}

const DatePickerHeader = ({ size = 1, selectedDate, titleDate, setTitleDate }: DatePickerHeaderProps) => {
  const [isPickerOpen, setPickerOpen] = useState<boolean>(false);
  const [isYearClick, setYearClick] = useState<boolean>(false);
  const [isMonthClick, setMonthClick] = useState<boolean>(false);
  const year = Array.from(Array(200), (_, i) => `${i + DateTime.now().year - 100}`);
  const month = Array.from(Array(12), (_, i) => `00${i + 1}`.slice(-2));

  const SwitchIcon = (): JSX.Element => {
    if (isPickerOpen) return <Icon.ArrowTopLine width={18} height={18} />;
    return <Icon.ArrowBottomLine width={18} height={18} />;
  };

  const handlePrevClick = () => {
    const newDate = titleDate.plus({ months: -1 });
    setTitleDate(newDate);
  };

  const handleNextClick = () => {
    const newDate = titleDate.plus({ months: 1 });
    setTitleDate(newDate);
  };

  return (
    <HeaderContainer size={size}>
      <TitleWrapper>
        <TextButton
          id="yearButton"
          selected={isYearClick}
          onClick={() => {
            setPickerOpen(true);
            setYearClick(true);
          }}
        >
          {titleDate.toFormat('yyyy')}
        </TextButton>
        .
        <TextButton
          id="monthButton"
          selected={isMonthClick}
          onClick={() => {
            setPickerOpen(true);
            setMonthClick(true);
          }}
        >
          {titleDate.toFormat('LL')}
        </TextButton>
        <SwitchIcon />
      </TitleWrapper>
      {isYearClick && (
        <TitlePicker
          width={71}
          item={year}
          selectedValue={`${selectedDate.toFormat('yyyy')}`}
          onValueClick={value => {
            const newDate = titleDate.set({ year: +value });
            setTitleDate(newDate);
            setYearClick(prev => !prev);
            setPickerOpen(prev => !prev);
          }}
          onOutsideClick={e => {
            setYearClick(prev => !prev);
            if (e.target instanceof Element && (e.target.id === 'yearButton' || e.target.id === 'monthButton')) return;
            setPickerOpen(prev => !prev);
          }}
        />
      )}
      {isMonthClick && (
        <TitlePicker
          width={56}
          offsetLeft={57}
          item={month}
          selectedValue={`${selectedDate.toFormat('LL')}`}
          onValueClick={value => {
            const newDate = titleDate.set({ month: +value });
            setTitleDate(newDate);
            setMonthClick(prev => !prev);
            setPickerOpen(prev => !prev);
          }}
          onOutsideClick={e => {
            setMonthClick(prev => !prev);
            if (e.target instanceof Element && (e.target.id === 'yearButton' || e.target.id === 'monthButton')) return;
            setPickerOpen(prev => !prev);
          }}
        />
      )}
      <CalendarPickerButtonWrapper>
        <IconButton onClick={handlePrevClick}>
          <Icon.ArrowBackLine width={18} height={18} />
        </IconButton>
        <IconButton onClick={handleNextClick}>
          <Icon.ArrowFrontLine width={18} height={18} />
        </IconButton>
      </CalendarPickerButtonWrapper>
    </HeaderContainer>
  );
};

export default DatePickerHeader;
