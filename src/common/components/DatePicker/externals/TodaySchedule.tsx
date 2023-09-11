import { MouseEvent, useEffect, useState } from 'react';
import { DateTime, Info } from 'luxon';
import { getLunar } from 'holiday-kr';
import { Icon, useWaplUiStore } from '@wapl/ui';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { getEventDuration, toDateString, toLuxon, toUTC } from '@/utils';
import { useCalendarStores } from '@/stores/StoreProvider';
import { EventTitle } from '@/web/components';
import {
  BodyContainer,
  DateInfoContainer,
  DatePickerBody,
  EventColor,
  EventInfoContainer,
  EventItemContainer,
  EventWrapper,
  HeaderContainer,
  ItemTitleContainer,
  NoResultContainer,
  NoResultTitle,
  TodayScheduleContainer,
  EventInfo,
  CalendarHeaderContainer,
  CalendarHeader,
  CalendarContent,
  CustomPickersDay,
  MoreResultText,
  LunarText,
  DateDayText,
  HolidayText,
} from './TodaySchedule.style';
import { EventModel } from '@/stores';
import { APP_ID } from '@/common/constants';

export const TodaySchedule = () => {
  const { calendarStore, eventStore, uiStore } = useCalendarStores();
  const { themeKey } = useWaplUiStore();
  const [date] = useState(DateTime.now().startOf('day'));
  const [eventList, setEventList] = useState<EventModel[]>([]);
  const size = 0.7;
  const startingDay = 7;
  const weekdays = Array.from(
    { length: 7 },
    (_, i) => Info.weekdays('short', { locale: 'ko' })[(i + startingDay - 1) % 7],
  );
  const startOfMonth = date.set({ day: 1 }).set({ weekday: startingDay });
  const firstDay = startOfMonth > date.set({ day: 1 }) ? startOfMonth.minus({ weeks: 1 }) : startOfMonth;
  const dayOfMonth = Array.from({ length: 42 }, (_, i) => firstDay.plus({ days: i }));

  const lunar = () => {
    const { month, day } = getLunar(date.toJSDate());
    return `음력 ${month}.${day}`;
  };

  const holiday = () => {
    const holidayList = calendarStore.holidayList.filter(holiday => holiday.dateDay === date.toFormat('yyyy-LL-dd'));
    return (
      <>
        {holidayList.map((holiday, index) => (
          <HolidayText key={index}>{holiday.name}</HolidayText>
        ))}
      </>
    );
  };

  const handleClickCalendar = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    window.parent.postMessage({
      type: 'shell:runTopping',
      appId: APP_ID.CALENDAR,
    });
  };

  const handleClickEvent = (event: EventModel) => {
    window.parent.postMessage({
      type: 'shell:runTopping',
      appId: APP_ID.CALENDAR,
      options: {
        from: 'widget',
        eventId: event.id,
        start: event.start,
        roomId: event.roomId,
      },
    });
  };

  const handleClickMoreEvent = () =>
    window.parent.postMessage({
      type: 'shell:runTopping',
      appId: APP_ID.CALENDAR,
      options: {
        from: 'widget',
        start: toUTC(date),
      },
    });

  const SortEventList = (arr: EventModel[]) =>
    arr.filter(event => date < toLuxon(event.end) && toLuxon(event.start) < date.plus({ days: 1 }));

  const fetchEventList = async () => {
    const { eventList } = await eventStore.getEventList(toDateString(date.toJSDate()), toDateString(date.toJSDate()));
    setEventList(SortEventList(eventList));
  };

  useEffect(() => {
    fetchEventList();
  }, []);

  return (
    <TodayScheduleContainer>
      <HeaderContainer size={size}>
        <DateInfoContainer onClick={handleClickCalendar}>
          <div>{date.toFormat('yyyy.LL.', { locale: 'ko' })}</div>
          <DateDayText>{date.toFormat('dd', { locale: 'ko' })}</DateDayText>
          <div>{date.toFormat('cccc', { locale: 'ko' })}</div>
          <LunarText>{lunar()}</LunarText>
          {uiStore.isHolidayChecked && holiday()}
        </DateInfoContainer>
        <DatePickerBody size={size} onClick={handleClickCalendar}>
          <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="ko">
            <>
              <CalendarHeaderContainer size={size}>
                {weekdays.map((day, index) => (
                  <CalendarHeader key={day} isRed={(index + startingDay - 1) % 7 === 6}>
                    {day}
                  </CalendarHeader>
                ))}
              </CalendarHeaderContainer>
              <CalendarContent size={size}>
                {dayOfMonth.map(value => (
                  <CustomPickersDay
                    key={value.toFormat('yyyy-LL-dd')}
                    day={value}
                    onDaySelect={() => {
                      null;
                    }}
                    size={size}
                    isLight={themeKey === 'light'}
                    isSunday={value.weekday === 7}
                    isOutside={date.month !== value.month}
                    today={value.toFormat('yyyy-LL-dd') === DateTime.local().toFormat('yyyy-LL-dd')}
                    selected={value.toFormat('yyyy-LL-dd') === date.toFormat('yyyy-LL-dd')}
                    outsideCurrentMonth={false}
                  />
                ))}
              </CalendarContent>
            </>
          </LocalizationProvider>
        </DatePickerBody>
      </HeaderContainer>

      {eventList.length > 0 ? (
        <BodyContainer>
          {eventList.slice(0, 3).map((event, idx) => (
            <EventWrapper key={idx} onClick={() => handleClickEvent(event)}>
              <EventColor color={event.color ?? event.backgroundColor} />
              <EventItemContainer>
                <ItemTitleContainer>
                  {event.importance && <Icon.BookmarkFill className="mr-8" color="#fcbb00" width={16} height={16} />}
                  <EventTitle isHalfLess>
                    {event.title.length < 11 ? event.title : `${event.title.slice(0, 10)}...`}
                  </EventTitle>
                </ItemTitleContainer>
                <EventInfoContainer>
                  <EventInfo>
                    {getEventDuration(DateTime.fromISO(event.start), DateTime.fromISO(event.end), event.allDay)}
                  </EventInfo>
                  {/* {event.repeatEndDate && (
                    <EventInfo>{DateTime.fromISO(event.repeatEndDate).toFormat('yyyy. LL. dd. 종료')}</EventInfo>
                  )} */}
                </EventInfoContainer>
              </EventItemContainer>
            </EventWrapper>
          ))}
          {eventList.length > 3 && <MoreResultText onClick={handleClickMoreEvent}>일정 더 보기...</MoreResultText>}
        </BodyContainer>
      ) : (
        <NoResultContainer>
          <NoResultTitle>일정이 없습니다.</NoResultTitle>
        </NoResultContainer>
      )}
    </TodayScheduleContainer>
  );
};

TodaySchedule.displayName = 'TodaySchedule';
