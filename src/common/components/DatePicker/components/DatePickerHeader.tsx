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
<<<<<<< HEAD
  isMobile?: boolean;
=======
  onPrevClick?: () => void;
  onNextClick?: () => void;
  prevDisabled?: boolean;
  nextDisabled?: boolean;
>>>>>>> 0293881... feat: datePicker 관련 style, onPrevClick, onNextClick, prevDisabled, nextDisabled Props 제공
}

const DatePickerHeader = ({
  size = 1,
  selectedDate,
  titleDate,
  setTitleDate,
  onPrevClick,
  onNextClick,
  prevDisabled,
  nextDisabled,
}: DatePickerHeaderProps) => {
  const [isPickerOpen, setPickerOpen] = useState<boolean>(false);
  const [isYearClick, setYearClick] = useState<boolean>(false);
  const [isMonthClick, setMonthClick] = useState<boolean>(false);
  const year = Array.from({ length: 200 }, (_, i) => `${i + DateTime.now().year - 100}`);
  const month = Array.from({ length: 12 }, (_, i) => `00${i + 1}`.slice(-2));

  const handleTitleClick = (type: string) => {
    setPickerOpen(true);
    if (type === 'year') setYearClick(true);
    else setMonthClick(true);
  };

  const SwitchIcon = (): JSX.Element => {
    if (isPickerOpen) return <Icon.ArrowTopLine width={18} height={18} />;
    return <Icon.ArrowBottomLine width={18} height={18} />;
  };

  const handleYearClick = (year: string) => {
    const newDate = titleDate.set({ year: +year });
    setTitleDate(newDate);
    setYearClick(prev => !prev);
    setPickerOpen(prev => !prev);
  };

  const handleMonthClick = (month: string) => {
    const newDate = titleDate.set({ month: +month });
    setTitleDate(newDate);
    setMonthClick(prev => !prev);
    setPickerOpen(prev => !prev);
  };

  const handleOutsideClick = (type: string) => (e: MouseEvent) => {
    if (type === 'year') setYearClick(prev => !prev);
    else setMonthClick(prev => !prev);
    if (e.target instanceof Element && (e.target.id === 'yearButton' || e.target.id === 'monthButton')) return;
    setPickerOpen(prev => !prev);
  };

  const handlePrevClick = () => {
    const newDate = titleDate.plus({ months: -1 });
    setTitleDate(newDate);
    if (onPrevClick) onPrevClick();
  };

  const handleNextClick = () => {
    const newDate = titleDate.plus({ months: 1 });
    setTitleDate(newDate);
    if (onNextClick) onNextClick();
  };

  return (
    <HeaderContainer size={size}>
      <TitleWrapper>
        <TextButton id="yearButton" selected={isYearClick} onClick={() => handleTitleClick('year')}>
          {titleDate.toFormat('yyyy')}
        </TextButton>
        .
        <TextButton id="monthButton" selected={isMonthClick} onClick={() => handleTitleClick('month')}>
          {titleDate.toFormat('LL')}
        </TextButton>
        <SwitchIcon />
      </TitleWrapper>
      {isYearClick && (
        <TitlePicker
          width={71}
          item={year}
          selectedValue={`${selectedDate.toFormat('yyyy')}`}
          onValueClick={handleYearClick}
          onOutsideClick={handleOutsideClick('year')}
        />
      )}
      {isMonthClick && (
        <TitlePicker
          width={56}
          offsetLeft={57}
          item={month}
          selectedValue={`${selectedDate.toFormat('LL')}`}
          onValueClick={handleMonthClick}
          onOutsideClick={handleOutsideClick('month')}
        />
      )}
      <CalendarPickerButtonWrapper>
        <IconButton onClick={handlePrevClick} disabled={prevDisabled ?? false}>
          <Icon.ArrowBackLine width={18} height={18} />
        </IconButton>
        <IconButton onClick={handleNextClick} disabled={nextDisabled ?? false}>
          <Icon.ArrowFrontLine width={18} height={18} />
        </IconButton>
      </CalendarPickerButtonWrapper>
    </HeaderContainer>
  );
};

export default DatePickerHeader;
