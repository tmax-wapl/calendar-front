import { DateInfo as Container, DateDay, Lunar, Holiday } from './DateInfo.style';
import { getLunar } from 'holiday-kr';
import { DateTime } from 'luxon';
import { HolidayDTO } from '@/common/constants/interfaces';

interface Prop {
  date: DateTime;
  holydayList?: HolidayDTO[];
  isHolidayChecked?: boolean;
  isLunarChecked?: boolean;
  backgroundColor?: string;
}

export const DateInfo = ({
  date,
  holydayList,
  isHolidayChecked = true,
  isLunarChecked = true,
  backgroundColor,
}: Prop) => {
  const getDateDay = (): string => {
    return date.toFormat('dd일 cccc', { locale: 'ko' });
  };
  const lunar = () => {
    const { month, day } = getLunar(date.toJSDate());
    return `음력 ${month}.${day}`;
  };

  const holiday = () => {
    const holidayList = holydayList?.filter(holiday => holiday.dateDay === date.toFormat('yyyy-LL-dd'));

    return (
      <>
        {holidayList?.map((holiday, index) => (
          <Holiday key={index} isRed={holiday.isRed}>
            {holiday.name}
          </Holiday>
        ))}
      </>
    );
  };

  return (
    <Container backgroundColor={backgroundColor}>
      <DateDay>{getDateDay()}</DateDay>
      {isHolidayChecked && holiday()}
      {isLunarChecked && <Lunar isRed={false}>{lunar()}</Lunar>}
    </Container>
  );
};

DateInfo.displayName = 'DateInfo';
