import { useObserver } from 'mobx-react-lite';
import { Icon } from '@wapl/ui';
import { useLocation } from 'react-router-dom';
import { useCalendarStores } from '@/stores/StoreProvider';
import { EventModel } from '@/stores/model/EventModel';
import { EventHandleViewContainer, EventHandleContainer, FromInfo } from './EventHandleView.style';
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
import { DateTime } from 'luxon';

interface Props {
  action: 'create' | 'edit';
}

const EventHandleView = ({ action }: Props) => {
  const { eventStore, uiStore } = useCalendarStores();
  const { state } = useLocation();

  return useObserver(() => (
    <EventHandleViewContainer>
      <EventBar
        title={action === 'create' ? '새 일정' : '일정 수정'}
        leftSide={[{ action: 'close', onClick: () => console.log('close') }]}
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
      </EventHandleContainer>
    </EventHandleViewContainer>
  ));
};

export default EventHandleView;
