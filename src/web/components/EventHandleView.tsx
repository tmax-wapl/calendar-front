import { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Icon, Button } from '@wapl/ui';
import { useNavigate } from 'react-router-dom';
import { useCalendarStores } from '@/stores/StoreProvider';
import { CalendarContext } from '@common/contexts/CalendarContext';
import { EventModel } from '@/stores/model/EventModel';
import { EventHandleViewContainer, EventHandleContainer, FromInfo, ButtonGroup } from './EventHandleView.style';
import EventBar from './EventBar';
import {
  EventTitle,
  EventDate,
  RepeatInfo,
  Participants,
  Location,
  Notifications,
  Description,
  Attachments,
} from '@common/components/EventInfoItem';
import { ColorPicker } from '@common/components/ContextMenu';
import { getStartDate, toISO, rruleString, toLuxon } from '@/utils';
import { autorun } from 'mobx';
import { EVENT_UPDATE_OPTION } from '@/common/constants';
import { DateTime } from 'luxon';

interface Props {
  action: 'create' | 'update';
}

const EventHandleView = observer(({ action }: Props) => {
  const { calendarStore, eventStore, uiStore } = useCalendarStores();
  const { userId } = useContext(CalendarContext);
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(`/main/view-mode/${uiStore.viewMode}`);
  };

  const preprocessEvent = (event: EventModel): EventModel => {
    return new EventModel({
      ...event.dto,
      modUserId: userId,
      ...(action === 'create' && { regUserId: userId }),
      ...(!event.title && { title: 'Untitled' }),
      ...(event.allDay && {
        start: toISO(event.startDate.startOf('day').toUTC()),
        end: toISO(event.endDate.startOf('day').plus({ days: 1 }).toUTC()),
      }),
      ...(event.rrule && {
        repeatStartDate: toISO(event.startDate.toUTC()),
        repeatEndDate: event.repeatEndDate ? toISO(event.repeatEndDate.toUTC()) : '9999-01-01T00:00:00Z',
      }),
    });
  };

  const handleCreate = async () => {
    const event = await eventStore.createEvent(preprocessEvent(eventStore.event));
    calendarStore.appendEventList(event);
    navigate('/main/detail');
  };

  const updateEvent = async (isRepeat = false) => {
    const event = await eventStore.updateEvent(
      +eventStore.event.id,
      preprocessEvent(eventStore.event),
      EVENT_UPDATE_OPTION.DEFAULT,
    );
    if (!isRepeat) calendarStore.updateEventList(event);
    navigate('/main/detail');
  };

  const updateRepeatEvent = async (value: string) => {
    const { startDate, endDate } = eventStore.event;
    switch (value) {
      case 'one': // 이 일정만 수정
        await eventStore.updateEvent(
          +eventStore.event.id,
          new EventModel({
            ...eventStore.event.dto,
            id: null,
            start: toISO(startDate.toUTC()),
            end: toISO(endDate.toUTC()),
            exDate: toISO(startDate.toUTC()),
          }),
          EVENT_UPDATE_OPTION.ONCE_REPEAT_EVENT,
        );
        navigate('/main/detail');
        break;
      case 'after': // 이 일정 및 향후 일정 수정
        await eventStore.updateEvent(
          +eventStore.event.id,
          new EventModel({
            ...eventStore.event.dto,
            id: null,
            repeatStartDate: toISO(startDate.toUTC()),
            repeatEndDate: toISO(eventStore.event.repeatEndDate.toUTC()),
            rrule: rruleString(eventStore.event.rrule),
          }),
          EVENT_UPDATE_OPTION.AFTER_REPEAT_EVENT,
        );
        navigate('/main/detail');
        break;
      case 'all': // 모든 일정 수정
        updateEvent(true);
        break;
      default:
        break;
    }
    uiStore.dialogInfo = null;
    uiStore.changeDateRange();
  };

  const handleUpdate = async () => {
    // 1. 일반 일정인지? 반복 일정인지 여부
    // 2. 팝업에서 선택한 옵션에 따라 서비스 콜 분기.
    if (!eventStore.event.rrule) updateEvent();
    else {
      // 팝업 열고.. 선택해야겠지..?
      // 선택하는데 옵션이 아마 세개가 올거야 contextMenuItem 처럼
      uiStore.dialogInfo = {
        action: 'repeatEventUpdate',
        onClick: [(): void => (uiStore.dialogInfo = null), updateRepeatEvent],
        type: 'select',
      };
    }
    // 1번 테스트
    // const event = await eventStore.updateEvent(
    //   eventStore.eventId,
    //   new EventModel({
    //     ...eventStore.event.dto,
    //     rrule: rruleString(eventStore.event.rrule),
    //   }),
    //   1,
    // );
    //  3번 테스트
    // const event = await eventStore.updateEvent(
    //   eventStore.eventId,
    //   new EventModel({
    //     ...eventStore.event.dto,
    //     id: null,
    //     repeatStartDate: toISO(toLuxon('2023-02-23')),
    //     repeatEndDate: toISO(eventStore.event.repeatEndDate),
    //     rrule: rruleString(eventStore.event.rrule),
    //   }),
    //   3,
    // );
    // 4번 테스트
    // const event = await eventStore.updateEvent(
    //   eventStore.eventId,
    //   new EventModel({
    //     ...eventStore.event.dto,
    //     id: null,
    //     color: '#000000',
    //     repeatStartDate: toISO(toLuxon('2023-03-09')),
    //     repeatEndDate: toISO(eventStore.event.repeatEndDate),
    //     rrule: rruleString(eventStore.event.rrule),
    //   }),
    //   4,
    // );
    // 6번 테스트
    // const event = await eventStore.updateEvent(
    //   eventStore.eventId,
    //   new EventModel({
    //     ...eventStore.event.dto,
    //     repeatEndDate: toISO(toLuxon('2023-03-24')),
    //     rrule: rruleString(eventStore.event.rrule),
    //   }),
    //   6,
    // );
    //  7번 테스트
    // const event = await eventStore.updateEvent(
    //   eventStore.eventId,
    //   new EventModel({
    //     ...eventStore.event.dto,
    //     start: toISO(toLuxon('2023-02-17')),
    //     end: toISO(toLuxon('2023-02-17')),
    //     exceptDate: toISO(toLuxon('2023-02-17')),
    //   }),
    //   7,
    // );
    // const closeDialog = (): any => (uiStore.dialogInfo = null);
    // const getSelectType = async (value: string) => {
    //   uiStore.dialogInfo = null;
    //   if (value === 'after') {
    //     //  3번 테스트
    //     const event = await eventStore.updateEvent(
    //       eventStore.eventId,
    //       new EventModel({
    //         ...eventStore.event.dto,
    //         id: null,
    //         repeatStartDate: toISO(toLuxon('2023-03-03')),
    //         repeatEndDate: toISO(eventStore.event.repeatEndDate),
    //         rrule: rruleString(eventStore.event.rrule),
    //       }),
    //       3,
    //     );
    //   }
    // };
  };

  useEffect(() => {
    if (action === 'create') {
      const start = getStartDate(uiStore.dateDay).toUTC();
      eventStore.setEvent(
        new EventModel({
          calId: 251,
          start: toISO(start),
          end: toISO(start.plus({ minutes: 30 })),
        }),
      );
      return;
    }
    if (!eventStore.event.id) {
      navigate('/main');
      return;
    }
    if (eventStore.event.allDay) {
      eventStore.event.startDate = eventStore.event.startDate.set({ hour: 9, minute: 0 });
      eventStore.event.endDate = eventStore.event.endDate.set({ hour: 9, minute: 30 });
      return;
    }
  }, [action]);

  useEffect(() => {
    return () => eventStore.setEvent(new EventModel({}));
  }, []);

  return (
    <EventHandleViewContainer>
      <EventBar
        title={action === 'create' ? '새 일정' : '일정 수정'}
        leftSide={[{ action: 'close', onClick: handleClose }]}
      />
      <EventHandleContainer>
        <EventTitle
          title={eventStore.event.title}
          importance={eventStore.event.importance}
          onTitleChange={value => (eventStore.event.title = value)}
          onImportanceChange={value => (eventStore.event.importance = value)}
        />
        <EventDate
          allDay={eventStore.event.allDay}
          start={eventStore.event.startDate}
          end={eventStore.event.endDate}
          onAllDayChange={value => (eventStore.event.allDay = value)}
          onStartChange={value => (eventStore.event.startDate = value)}
          onEndChange={value => (eventStore.event.endDate = value)}
        />
        <RepeatInfo
          rrule={eventStore.event.rrule}
          startDate={eventStore.event.startDate}
          defaultEndDate={eventStore.event.startDate?.plus({ years: 1 })}
          repeatEndDate={eventStore.event.repeatEndDate}
          onRRuleChange={value => (eventStore.event.rrule = value)}
        />
        <FromInfo>
          <Icon.CalendarLine className="mr-8" color="#202124" width={20} height={20} />
          <ColorPicker
            color={eventStore.event.color}
            iterationCount={11}
            columnGap={8}
            onClick={color => (eventStore.event.color = color)}
          />
        </FromInfo>
        {/* <Participants participants={eventStore.event.participants} editable /> */}
        <Location
          location={eventStore.event.location}
          onChange={value => (eventStore.event.location = value)}
          editable
        />
        {/* <Notifications
          notifications={eventStore.event.notifications}
          onChange={value => setEvent(prev => ({ ...prev, ...value }))}
          editable
        /> */}
        <Description
          description={eventStore.event.description}
          onChange={value => (eventStore.event.description = value)}
          editable
        />
        {/* <Attachments attachments={eventStore.event.attachments} editable /> */}
        <ButtonGroup fullWidth>
          <Button variant="secondary" size="large" onClick={handleClose}>
            취소
          </Button>
          {action === 'create' ? (
            <Button
              size="large"
              onClick={handleCreate}
              disabled={
                eventStore.event.startDate > eventStore.event.endDate ||
                eventStore.event.startDate > eventStore.event.repeatEndDate
              }
            >
              생성
            </Button>
          ) : (
            <Button
              size="large"
              onClick={handleUpdate}
              disabled={
                eventStore.event.startDate > eventStore.event.endDate ||
                eventStore.event.startDate > eventStore.event.repeatEndDate
              }
            >
              수정
            </Button>
          )}
        </ButtonGroup>
      </EventHandleContainer>
    </EventHandleViewContainer>
  );
});

export default EventHandleView;
