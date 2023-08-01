import { useState } from 'react';
import { DateTime } from 'luxon';
import { ContextMenu, ContentMenuHeader } from '@wapl/ui';
import { SwiperWheelPicker } from '../../WheelPicker';
import SpinnerPickerItem from './SpinnerPickerItem';
import { PickerContainer, ButtonWrapper, Selected, StyledButton } from './SpinnerPicker.style';

interface DatePickerProps {
  title?: string;
  date: DateTime;
  onTimeChange?: (time: DateTime) => void;
  onOutsideClick?: () => void;
}

const TimeSpinnerPicker = ({ title = '캘린더 시간 선택', date, onTimeChange, onOutsideClick }: DatePickerProps) => {
  const [meridiem, setMeridiem] = useState<string>(date.toFormat('a', { locale: 'ko' }));
  const [hour, setHour] = useState<string>(date.toFormat('h'));
  const [minute, setMinute] = useState<string>(date.toFormat('mm'));
  const ampm = ['오전', '오후'];
  const hours = ['12', ...Array.from({ length: 11 }, (_, i) => `${i + 1}`)];
  const minutes = Array.from({ length: 60 }, (_, i) => ('00' + i).slice(-2));

  const handleDateChange = () => {
    if (!onTimeChange) return;
    const time = DateTime.fromFormat(`${meridiem} ${hour}:${minute}`, 'a h:mm', { locale: 'ko' });
    onTimeChange(date.set({ hour: time.hour, minute: time.minute }));
    onOutsideClick();
  };

  const handleMeridiemClick = (index: number) => setMeridiem(ampm[index]);
  const handleHourClick = (index: number) => setHour(hours[index]);
  const handleMinuteClick = (index: number) => setMinute(minutes[index]);

  return (
    <ContextMenu open>
      <ContentMenuHeader>{title}</ContentMenuHeader>
      <PickerContainer id="itemContainer">
        <Selected id="selectedDiv" />
        <SwiperWheelPicker
          loop={false}
          visibleHeight={108}
          slidesPerView={2}
          slides={ampm}
          selectedIndex={meridiem === '오전' ? 0 : 1}
          onValueChange={handleMeridiemClick}
        />
        <SpinnerPickerItem height={108} item={hours} selectedValue={hour} onValueChange={handleHourClick} />
        <SpinnerPickerItem height={108} item={minutes} selectedValue={minute} onValueChange={handleMinuteClick} />
      </PickerContainer>
      <ButtonWrapper>
        <StyledButton variant="secondary" size="medium" onClick={onOutsideClick}>
          취소
        </StyledButton>
        <StyledButton variant="primary" size="medium" onClick={handleDateChange}>
          확인
        </StyledButton>
      </ButtonWrapper>
    </ContextMenu>
  );
};

export default TimeSpinnerPicker;
