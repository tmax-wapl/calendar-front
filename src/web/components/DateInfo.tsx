import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { DateTime } from 'luxon';
import { getLunar } from 'holiday-kr';
import { useCalendarStores } from '@/stores/StoreProvider';
import { DateInfoContainer, DateDay, Holiday, Lunar } from './DateInfo.style';

interface Props {
  date: DateTime;
  highlightToday?: boolean;
}

const DateInfo = observer(({ date, highlightToday = false }: Props) => {
  const { calendarStore, uiStore } = useCalendarStores();

  const dateDay = (): string => {
    return date.toFormat('LL월 dd일 cccc', { locale: 'ko' });
  };

  const lunar = () => {
    const { month, day } = getLunar(date.toJSDate());
    return `음력 ${month}.${day}`;
  };

  const holiday = () => {
    const holidayList = calendarStore.holidayList.filter(holiday => holiday.dateDay === date.toFormat('yyyy-LL-dd'));

    return (
      <>
        {holidayList.map((holiday, index) => (
          <Holiday key={index} isRed={holiday.isRed}>
            {holiday.name}
          </Holiday>
        ))}
      </>
    );
  };

  useEffect(() => {
    if (!highlightToday) return;
    document.querySelector('.today')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <DateInfoContainer {...(highlightToday && { className: 'today' })}>
      <DateDay isHighlight={highlightToday}>{dateDay()}</DateDay>
      {uiStore.isHolidayChecked && holiday()}
      {uiStore.isLunarChecked && <Lunar isRed={false}>{lunar()}</Lunar>}
    </DateInfoContainer>
  );
});

export default DateInfo;
