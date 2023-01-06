import { useEffect, useState } from 'react';
import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import { Icon } from '@wapl/ui';
import { useNavigate } from 'react-router-dom';
import { EventDetailViewContainer, EventDetailContainer, FromInfo, Creator } from './EventDetailView.style';
import EventBar from './EventBar';
import EventItem from './EventItem';
import { Participants, Location, Notifications, Description, Attachments } from '@common/components/EventInfoItem';
import { useCalendarStores } from '@/stores/StoreProvider';

const EventDetailView = observer(() => {
  const { eventStore } = useCalendarStores();
  const navigate = useNavigate();
  const [editable, setEditable] = useState<boolean>(false);

  const fetchData = async (id: number) => {
    const event = await eventStore.getEventInfo(id);
    eventStore.setEvent(event);
  };

  useEffect(() => {
    const dispose = autorun(() => {
      const { eventId } = eventStore;
      if (eventId === +eventStore.event.id) return;
      if (eventId) fetchData(eventId);
      else navigate('/main');
    });
    return () => dispose();
  }, []);

  return (
    <EventDetailViewContainer>
      <EventBar
        leftSide={[{ action: 'back', onClick: () => navigate(-1) }]}
        rightSide={[
          { action: 'share', onClick: () => console.log('share') },
          { action: 'edit', onClick: () => setEditable(true) },
          { action: 'delete', onClick: () => console.log('delete') },
        ]}
      />
      {eventStore.event && (
        <EventDetailContainer>
          <EventItem event={eventStore.event} isDetail />
          <FromInfo>
            <Icon.CalendarLine className="mr-8" color="#202124" width={20} height={20} />
            {eventStore.event.calName}
            <Creator>&nbsp;{`(일정 생성: ${eventStore.event.regUserId})`}</Creator>
          </FromInfo>
          {/* {eventStore.event.participants.length && <Participants participants={eventStore.event.participants} />} */}
          {eventStore.event.location && <Location location={eventStore.event.location} />}
          {/* {eventStore.event.alarmList.length > 0 && (
            <Notifications notifications={eventStore.event.alarmList.map(({ time, timestamp }) => `${time} ${timestamp}`)} />
          )} */}
          {eventStore.event.description && <Description description={eventStore.event.description} />}
          {/* {eventStore.event.attachments?.length && <Attachments attachments={eventStore.event.attachments} />} */}
        </EventDetailContainer>
      )}
    </EventDetailViewContainer>
  );
});

export default EventDetailView;
