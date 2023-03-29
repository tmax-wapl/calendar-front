import { useState, useEffect } from 'react';
import { Observer } from 'mobx-react-lite';
import { Icon, Button } from '@wapl/ui';
import { useLocation, useNavigate } from 'react-router-dom';
import { DateTime } from 'luxon';
import { useCalendarStores } from '@/stores/StoreProvider';
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
import { getStartDate, toISO, isSameDate, applyWeekdayOffset } from '@/utils';
import { EVENT_UPDATE_OPTION, VIEW_MODE } from '@/common/constants';
import { useDidMountEffect } from '@/common/hooks';
import { EventMember } from '@/common/constants/interfaces';

interface Props {
  action: 'create' | 'update';
}

const EventHandleView = ({ action }: Props) => {
  const { calendarStore, eventStore, uiStore } = useCalendarStores();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [originEvent, setOriginEvent] = useState(new EventModel({ ...eventStore.event.dto }));

  const handleClose = () => {
    navigate(`/main/view-mode/${uiStore.viewMode}/date`);
  };

  const preprocessEvent = (event: EventModel): EventModel => {
    const startDate = event.allDay ? event.startDate.startOf('day') : event.startDate;
    return new EventModel({
      ...event.dto,
      ...(!event.title && { title: 'Untitled' }),
      ...(event.allDay && {
        start: toISO(startDate.toUTC()),
        end: toISO(event.endDate.startOf('day').plus({ days: 1 }).toUTC()),
      }),
      ...(event.rrule && {
        ...(event.rrule.freq === 2 && {
          rrule: applyWeekdayOffset(event.rrule, startDate, 'UTC').toString(),
        }),
        ...(event.repeatEndDate && {
          repeatEndDate: toISO(event.allDay ? event.repeatEndDate.startOf('day').toUTC() : event.repeatEndDate.toUTC()),
        }),
      }),
    });
  };

  const handleCreate = async () => {
    if (!eventStore.event.calId) eventStore.event.calId = calendarStore.getCalendarId();
    await eventStore.createEvent(preprocessEvent(eventStore.event));
    uiStore.changeDateRange();
    navigate(`/main/view-mode/${uiStore.viewMode}/detail`);
  };

  const updateEvent = async (isRepeat = false) => {
    await eventStore.updateEvent(
      +eventStore.event.id,
      preprocessEvent(eventStore.event),
      isRepeat ? EVENT_UPDATE_OPTION.ALL_REPEAT_EVENT : EVENT_UPDATE_OPTION.DEFAULT,
    );
    uiStore.changeDateRange();
    navigate(`/main/view-mode/${uiStore.viewMode}/detail`);
  };

  const updateRepeatEvent = async (value: string) => {
    switch (value) {
      case 'one': // 이 일정만 수정
        const originStart = originEvent.startDate.toUTC().toFormat('yyyy-LL-dd');
        const newStart = eventStore.event.startDate.toUTC().toFormat('yyyy-LL-dd');
        await eventStore.updateEvent(
          +eventStore.event.id,
          preprocessEvent(new EventModel({ ...eventStore.event.dto, id: null })),
          EVENT_UPDATE_OPTION.ONCE_REPEAT_EVENT,
          originStart !== newStart ? originStart : null,
        );
        navigate(`/main/view-mode/${uiStore.viewMode}/detail`);
        break;
      case 'after': // 이 일정 및 향후 일정 수정
        await eventStore.updateEvent(
          +eventStore.event.id,
          preprocessEvent(new EventModel({ ...eventStore.event.dto, id: null })),
          EVENT_UPDATE_OPTION.AFTER_REPEAT_EVENT,
          originEvent.startDate.toUTC().toFormat('yyyy-LL-dd'),
        );
        navigate(`/main/view-mode/${uiStore.viewMode}/detail`);
        break;
      case 'all': // 모든 일정 수정
        updateEvent(true);
        break;
      default:
        break;
    }
    uiStore.setDialogInfo(null);
    uiStore.changeDateRange();
  };

  const handleUpdate = async () => {
    const originStartDate = originEvent.startDate.toFormat('yyyy-LL-dd');
    const { rrule: originRRuleStr, repeatEndDate: originRepeatEnd } = originEvent.dto;
    const newStartDate = eventStore.event.startDate.toFormat('yyyy-LL-dd');
    const { rrule: newRRuleStr, repeatEndDate: newRepeatEnd } = eventStore.event.dto;

    if (!newRRuleStr) updateEvent();
    else if (!originRRuleStr && newRRuleStr) updateEvent(true);
    else if (originStartDate !== newStartDate && (originRRuleStr !== newRRuleStr || originRepeatEnd !== newRepeatEnd))
      updateRepeatEvent('after');
    else {
      uiStore.setDialogInfo({
        action: 'repeatEventUpdate',
        onClick: [(): void => uiStore.setDialogInfo(null), updateRepeatEvent],
        data: {
          selectType:
            originStartDate !== newStartDate
              ? 'hideAll'
              : originRRuleStr !== newRRuleStr || originRepeatEnd !== newRepeatEnd
              ? 'hideOne'
              : 'hideNone',
        },
        type: 'select',
      });
    }
  };

  const isMonth = (): boolean => uiStore.viewMode === VIEW_MODE.MONTH || !eventStore.event.startDate.isValid;
  const isToday = uiStore.dateDay.startOf('day').equals(DateTime.now().startOf('day'));

  const getTime = () => {
    const start = isMonth() && isToday ? getStartDate(uiStore.dateDay).toUTC() : eventStore.event.startDate.toUTC();
    const end = isMonth() && isToday ? start.plus({ minutes: 30 }) : eventStore.event.endDate.toUTC();

    return { start: toISO(start), end: toISO(end) };
  };

  useEffect(() => {
    if (action === 'create') {
      const calId = calendarStore.getCalendarId();
      eventStore.setEvent(
        new EventModel({
          calId: calId,
          start: getTime().start,
          end: getTime().end,
          alarmList: ['0'],
          allDay: !isToday && isMonth(),
        }),
      );
      setOriginEvent(new EventModel({ ...eventStore.event.dto }));
      return;
    }
    if (!eventStore.event.id) {
      navigate(`/main/view-mode/${uiStore.viewMode}/date`);
      return;
    }
    if (eventStore.event.allDay) {
      const startDate = eventStore.event.startDate.set({ hour: 9, minute: 0 });
      eventStore.event.startDate = startDate;
      eventStore.event.endDate = eventStore.event.endDate.plus({ days: -1 }).set({ hour: 9, minute: 30 });
      if (eventStore.event.repeatEndDate)
        eventStore.event.repeatEndDate = eventStore.event.repeatEndDate.set({ hour: 9, minute: 0 });
      setOriginEvent(new EventModel({ ...eventStore.event.dto }));
      return;
    }
  }, [action]);

  const isModified = () => {
    const { event } = eventStore;
    return (Object.keys(event.dto) as Array<keyof typeof event.dto>).find(key => {
      if ((!event.dto[key] && !originEvent.dto[key]) || key === 'repeatStartDate') return false;
      if (['start', 'end', 'repeatEndDate'].includes(key))
        return event.allDay
          ? !isSameDate(DateTime.fromISO(event.dto[key] as string), DateTime.fromISO(originEvent.dto[key] as string))
          : event.dto[key] !== originEvent.dto[key];
      return JSON.stringify(event.dto[key]) !== JSON.stringify(originEvent.dto[key]);
    });
  };

  const preventRefresh = (e: BeforeUnloadEvent) => {
    if (!isModified()) return;
    e.preventDefault();
    e.returnValue = '';
  };

  useEffect(() => {
    window.addEventListener('beforeunload', preventRefresh, {});
    return () => window.removeEventListener('beforeunload', preventRefresh);
  }, [originEvent]);

  const closeDialog = () => {
    uiStore.setDialogInfo(null);
  };

  const handleReset = () => {
    eventStore.setEvent(new EventModel({ ...originEvent.dto }));
    closeDialog();
  };

  useDidMountEffect(() => {
    if (!state) return;
    if (state?.isModify && isModified()) {
      uiStore.setDialogInfo({
        action: 'refresh',
        onClick: [closeDialog, handleReset],
      });
    }
  }, [state]);

  return (
    <EventHandleViewContainer>
      <EventBar
        title={action === 'create' ? '새 일정' : '일정 수정'}
        leftSide={[{ action: 'close', onClick: handleClose }]}
      />
      <EventHandleContainer>
        <Observer>
          {() => (
            <EventTitle
              title={eventStore.event.title}
              importance={eventStore.event.importance}
              onTitleChange={value => (eventStore.event.title = value)}
              onImportanceChange={value => (eventStore.event.importance = value)}
            />
          )}
        </Observer>
        <Observer>
          {() => (
            <EventDate
              allDay={eventStore.event.allDay}
              start={eventStore.event.startDate}
              end={eventStore.event.endDate}
              onAllDayChange={value => (eventStore.event.allDay = value)}
              onStartChange={value => (eventStore.event.startDate = value)}
              onEndChange={value => (eventStore.event.endDate = value)}
            />
          )}
        </Observer>
        <Observer>
          {() => (
            <RepeatInfo
              rrule={eventStore.event.rrule}
              startDate={eventStore.event.startDate}
              defaultEndDate={eventStore.event.startDate?.plus({ years: 1 })}
              repeatEndDate={eventStore.event.repeatEndDate}
              onRRuleChange={value => (eventStore.event.rrule = value)}
              onStartChange={value => (eventStore.event.repeatStartDate = value)}
              onEndChange={value => (eventStore.event.repeatEndDate = value)}
            />
          )}
        </Observer>
        <Observer>
          {() => (
            <FromInfo>
              <Icon.CalendarLine className="mr-8" width={20} height={20} />
              <ColorPicker
                color={eventStore.event.color}
                iterationCount={8}
                rowGap={6}
                columnGap={8}
                onClick={color => (eventStore.event.color = color)}
              />
            </FromInfo>
          )}
        </Observer>
        <Observer>
          {() => (
            <Participants
              participants={
                eventStore.event.eventMember
                  ? [...eventStore.event.eventMember?.personaList, ...eventStore.event.eventMember?.roomList]
                  : []
              }
              onChange={(value: EventMember) => (eventStore.event.eventMember = value)}
              editable
            />
          )}
        </Observer>
        <Observer>
          {() => (
            <Location
              location={eventStore.event.location}
              onChange={value => (eventStore.event.location = value)}
              editable
            />
          )}
        </Observer>
        <Observer>
          {() => (
            <Notifications
              notifications={eventStore.event.notifications}
              onChange={value => (eventStore.event.notifications = value)}
              editable
            />
          )}
        </Observer>
        <Observer>
          {() => (
            <Description
              description={eventStore.event.description}
              onChange={value => (eventStore.event.description = value)}
              editable
            />
          )}
        </Observer>
        {/* <Attachments attachments={eventStore.event.attachments} editable /> */}
        <Observer>
          {() => (
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
          )}
        </Observer>
      </EventHandleContainer>
    </EventHandleViewContainer>
  );
};

export default EventHandleView;
