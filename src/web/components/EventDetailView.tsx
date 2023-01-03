import { useEffect, useState } from 'react';
import { EventDTO } from '@common/constants/interfaces';
import { Icon } from '@wapl/ui';
import { useNavigate } from 'react-router-dom';
import { EventDetailViewContainer, EventDetailContainer, FromInfo, Creator } from './EventDetailView.style';
import EventBar from './EventBar';
import EventItem from './EventItem';
import { Participants, Location, Notifications, Description, Attachments } from '@common/components/EventInfoItem';
import { useCalendarStores } from '@/stores/StoreProvider';
import { autorun } from 'mobx';

const EventDetailView = () => {
  const { eventStore } = useCalendarStores();
  const navigate = useNavigate();
  const [data, setData] = useState<EventDTO>();
  const [editable, setEditable] = useState<boolean>(false);

  const fetchData = async (id: number) => {
    const data = await eventStore.getEventInfo(id);
    setData(data);
  };

  useEffect(() => {
    autorun(() => {
      const { eventId } = eventStore;
      if (eventId) fetchData(eventId);
      else navigate('/main');
    });
    return () => setData(null);
  }, []);

  return (
    <EventDetailViewContainer>
      <EventBar
        leftSide={[{ action: 'back', onClick: () => console.log('back') }]}
        rightSide={[
          { action: 'share', onClick: () => console.log('share') },
          { action: 'edit', onClick: () => setEditable(true) },
          { action: 'delete', onClick: () => console.log('delete') },
        ]}
      />
      {data && (
        <EventDetailContainer>
          <EventItem event={data} isDetail />
          <FromInfo>
            <Icon.CalendarLine className="mr-8" color="#202124" width={20} height={20} />
            {data.calId}
            <Creator>&nbsp;{`(일정 생성: ${data.regUserId})`}</Creator>
          </FromInfo>
          {/* {event.participants.length && <Participants participants={event.participants} />} */}
          {data.location && <Location location={data.location} />}
          {data.alarmList.length && (
            <Notifications notifications={data.alarmList.map(({ time, timestamp }) => `${time} ${timestamp}`)} />
          )}
          {data.description && <Description description={data.description} />}
          {/* {data.attachments?.length && <Attachments attachments={event.attachments} />} */}
        </EventDetailContainer>
      )}
    </EventDetailViewContainer>
  );
};

export default EventDetailView;
