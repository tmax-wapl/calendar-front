import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Icon, Button } from '@wapl/ui';
import { useNavigate } from 'react-router-dom';
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
import { getStartDate, toISO } from '@/utils';
import { autorun } from 'mobx';

interface Props {
  action: 'create' | 'update';
}

const EventHandleView = observer(({ action }: Props) => {
  const { calendarStore, eventStore, uiStore } = useCalendarStores();
  const navigate = useNavigate();

  const fetchData = async () => {
    const event = await eventStore.getEventInfo(eventStore.eventId);
    eventStore.setEvent(event);
  };

  const handleClose = () => {
    navigate(-1);
  };

  const handleCreate = async () => {
    const event = await eventStore.createEvent(
      new EventModel({
        ...eventStore.event.dto,
        ...(!eventStore.event.title && { title: 'Untitled' }),
        ...(eventStore.event.allDay && {
          start: toISO(eventStore.event.startDate.startOf('day')),
          end: toISO(eventStore.event.endDate.startOf('day').plus({ days: 1 })),
        }),
      }),
    );
    calendarStore.appendEventList(event);
    navigate('/main/detail');
  };

  useEffect(() => {
    if (action === 'create') {
      const start = getStartDate(uiStore.dateDay);
      eventStore.setEvent(
        new EventModel({
          calId: 145,
          start: toISO(start),
          end: toISO(start.plus({ minutes: 30 })),
        }),
      );
      return;
    }
    // TODO: data fetch
    // TODO: 종일인 경우 start/end time 09:00-09:30으로 변경
  }, [uiStore.dateDay]);

  useEffect(() => {
    const dispose = autorun(() => {
      const { eventId } = eventStore;
      if (eventId) fetchData();
      else navigate('/main');
    });
    return () => dispose();
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
          <Button size="large" onClick={handleCreate}>
            생성
          </Button>
        </ButtonGroup>
      </EventHandleContainer>
    </EventHandleViewContainer>
  );
});

export default EventHandleView;
