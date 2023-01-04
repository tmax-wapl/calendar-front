import { useEffect, useState } from 'react';
import { Icon } from '@wapl/ui';
import { useNavigate } from 'react-router-dom';
import { EventModel } from '@/stores/model/EventModel';
import { EventDetailViewContainer, EventDetailContainer, FromInfo, Creator } from './EventDetailView.style';
import EventBar from './EventBar';
import EventItem from './EventItem';
import { Participants, Location, Notifications, Description, Attachments } from '@common/components/EventInfoItem';
import { useCalendarStores } from '@/stores/StoreProvider';
import { autorun } from 'mobx';

const EventDetailView = () => {
  const { eventStore } = useCalendarStores();
  const navigate = useNavigate();
  const [data, setData] = useState<EventModel>();
  const [editable, setEditable] = useState<boolean>(false);
  const event: EventModel = new EventModel({
    id: 0,
    calId: 0,
    calName: '캐릭터A의 캘린더',
    color: '#FF46B5',
    importance: true,
    title: '일정 제목 일정 제목일정 제목일정 제목일정 제목ㅇㄹㄴㄹㄴㅇㄹ',
    allDay: false,
    start: '2021-09-03T09:00:00',
    end: '2021-09-03T09:30:00',
    regUserId: 0,
    rrule: 'DTSTART:20210903T000000 RRULE:FREQ=WEEKLY;UNTIL=20210909T000000;INTERVAL=1;BYDAY=MO,TU,WE,TH,FR,SA,SU',
    participants: [
      { id: 1, name: '오써니' },
      { id: 2, name: '김써니' },
    ],
    location: 'Tmax 오리 연구소',
    notifications: [
      { time: 1, unit: 'h' },
      { time: 1, unit: 'd' },
    ],
    description:
      '설명문구설명문구설명문구설명문구설명문구설명문구설명문구설명문구설명문구설명문구설명문구설명문구설명문구설명문구설명문구설명문구',
    attachments: [
      { id: 1, name: 'Txt', extension: 'png', size: 80000 },
      { id: 2, name: 'Txt', extension: 'png', size: 80000 },
    ],
  }); // TODO: store 변수로 대체

  const fetchData = async (id: number) => {
    const data = await eventStore.getEventInfo(id);
    setData(new EventModel(data));
  };

  useEffect(() => {
    const dispose = autorun(() => {
      const { eventId } = eventStore;
      if (eventId) fetchData(eventId);
      else navigate('/main');
    });
    return () => {
      setData(null);
      dispose();
    };
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
      {data && (
        <EventDetailContainer>
          <EventItem event={data} isDetail />
          <FromInfo>
            <Icon.CalendarLine className="mr-8" color="#202124" width={20} height={20} />
            {data.calName}
            <Creator>&nbsp;{`(일정 생성: ${data.regUserId})`}</Creator>
          </FromInfo>
          {/* {event.participants.length && <Participants participants={event.participants} />} */}
          {data.location && <Location location={data.location} />}
          {/* {data.alarmList.length > 0 && (
            <Notifications notifications={data.alarmList.map(({ time, timestamp }) => `${time} ${timestamp}`)} />
          )} */}
          {data.description && <Description description={data.description} />}
          {/* {data.attachments?.length && <Attachments attachments={event.attachments} />} */}
        </EventDetailContainer>
      )}
    </EventDetailViewContainer>
  );
};

export default EventDetailView;
