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
import { getStartDate, toISO } from '@/utils';
import { EVENT_UPDATE_OPTION } from '@common/constants';

interface Props {
  action: 'create' | 'update';
}

const EventHandleView = observer(({ action }: Props) => {
  const { calendarStore, eventStore, uiStore } = useCalendarStores();
  const { userId } = useContext(CalendarContext);
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  const preprocessEvent = (event: EventModel): EventModel => {
    return new EventModel({
      ...event.dto,
      modUserId: userId,
      ...(action === 'create' && { regUserId: userId }),
      ...(!event.title && { title: 'Untitled' }),
      ...(event.allDay && {
        start: toISO(event.startDate.startOf('day')),
        end: toISO(event.endDate.startOf('day').plus({ days: 1 })),
      }),
    });
  };

  const handleCreate = async () => {
    const event = await eventStore.createEvent(preprocessEvent(eventStore.event));
    calendarStore.appendEventList(event);
    navigate('/main/detail');
  };

  const handleUpdate = async () => {
    const event = await eventStore.updateEvent(
      +eventStore.event.id,
      preprocessEvent(eventStore.event),
      EVENT_UPDATE_OPTION.DEFAULT,
    );
    calendarStore.updateEventList(event);
    navigate('/main/detail');
  };

  useEffect(() => {
    if (action === 'create') {
      const start = getStartDate(uiStore.dateDay);
      eventStore.setEvent(
        new EventModel({
          calId: 171,
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
          {action === 'create' ? (
            <Button size="large" onClick={handleCreate}>
              생성
            </Button>
          ) : (
            <Button size="large" onClick={handleUpdate}>
              수정
            </Button>
          )}
        </ButtonGroup>
      </EventHandleContainer>
    </EventHandleViewContainer>
  );
});

export default EventHandleView;
