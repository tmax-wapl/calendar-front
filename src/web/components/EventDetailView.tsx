import { useState } from 'react';
import { EventDTO } from '@common/constants/interfaces';
import { Icon } from '@wapl/ui';
import { useParams } from 'react-router-dom';
import { EventDetailViewContainer, EventDetailContainer, FromInfo, Creator } from './EventDetailView.style';
import EventBar from './EventBar';
import EventItem from './EventItem';
import { Participants, Location, Notifications, Description, Attachments } from '@common/components/EventInfoItem';

const EventDetailView = () => {
  const { detailId } = useParams();
  const [editable, setEditable] = useState<boolean>(false);
  const event: EventDTO = {
    color: '#FF46B5',
    importance: true,
    title: '일정 제목 일정 제목일정 제목일정 제목일정 제목ㅇㄹㄴㄹㄴㅇㄹ',
    time: '오전 9:00 ~ 오전 9:30',
    repeat: '1주 간격, 월 화 수 목 금 토 일 반복',
    endDate: '2022. 07. 23. 종료',
    calendarName: '캐릭터A의 캘린더',
    creator: '정성욱',
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
  }; // TODO: store 변수로 대체

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
      <EventDetailContainer>
        <EventItem event={event} isDetail />
        <FromInfo>
          <Icon.CalendarLine className="mr-8" color="#202124" width={20} height={20} />
          {event.calendarName}
          <Creator>&nbsp;{`(일정 생성: ${event.creator})`}</Creator>
        </FromInfo>
        {event.participants?.length && <Participants participants={event.participants} />}
        {event.location && <Location location={event.location} />}
        {event.notifications?.length && (
          <Notifications notifications={event.notifications.map(({ time, unit }) => `${time} ${unit}`)} />
        )}
        {event.description && <Description description={event.description} />}
        {event.attachments?.length && <Attachments attachments={event.attachments} />}
      </EventDetailContainer>
    </EventDetailViewContainer>
  );
};

export default EventDetailView;
