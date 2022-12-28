import { useState } from 'react';
import { Icon } from '@wapl/ui';
import { EventModel } from '@common/constants/interfaces';
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
  const [event, setEvent] = useState<Partial<EventModel>>({}); // [임시] for create
  // const [event, setEvent] = useState<Partial<EventModel>>({
  //   importance: false,
  //   title: '일정 제목 일정 제목일정 제목일정 제목일정 제목ㅇㄹㄴㄹㄴㅇㄹ',
  //   allDay: false,
  //   startDate: DateTime.fromMillis(1630627200000), // 2021-09-03T09:00:00
  //   endDate: DateTime.fromMillis(1630629000000), // 2021-09-03T09:30:00
  //   repeatTime: '1',
  //   repeatUnit: 'w',
  //   repeatEndDate: DateTime.fromMillis(1630627200000),
  //   repeatDays: [true, true, true, true, true, true, false],
  //   color: '#FF46B5',
  //   participants: [
  //     { id: 1, name: '이광옹' },
  //     { id: 2, name: '안순범' },
  //     { id: 3, name: '솜다연' },
  //   ],
  //   location: 'Tmax 오리 연구소',
  //   notifications: ['0', '5 m', '30 m', '1 h', '2 d'],
  //   description:
  //     '설커다란 대한 청춘의 뿐이다. 너의 소리다.이것은 구할 곳이 듣기만 있는 품으며, 얼마나 사랑의 황금시대다. 군영과 붙잡아 인생에 ',
  //   attachments: [
  //     { id: 1, name: 'Txt', extension: 'png', size: 80000 },
  //     { id: 2, name: 'Txt', extension: 'png', size: 80000 },
  //   ],
  // }); // [임시] for edit

  return (
    <EventHandleViewContainer>
      <EventBar
        title={action === 'create' ? '새 일정' : '일정 수정'}
        leftSide={[{ action: 'close', onClick: () => console.log('close') }]}
      />
      <EventHandleContainer>
        <EventTitle
          title={event.title}
          importance={event.importance}
          onChange={value => setEvent(prev => ({ ...prev, ...value }))}
        />
        <EventDate
          allDay={event.allDay}
          startDate={DateTime.now()}
          endDate={DateTime.now().plus({ minutes: 30 })}
          // onChange={value => setEvent(prev => ({ ...prev, ...value }))}
        />
        {/* <RepeatInfo
          repeatTime={event.repeatTime}
          repeatUnit={event.repeatUnit}
          repeatEndDate={event.repeatEndDate}
          defaultEndDate={event.startDate?.plus({ years: 1 })}
          repeatDays={event.repeatDays}
          onChange={value => setEvent(prev => ({ ...prev, ...value }))}
        /> */}
        <FromInfo>
          <Icon.CalendarLine className="mr-8" color="#202124" width={20} height={20} />
          <ColorPicker iterationCount={11} columnGap={8} />
        </FromInfo>
        <Participants participants={event.participants} editable />
        <Location location={event.location} onChange={value => setEvent(prev => ({ ...prev, ...value }))} editable />
        <Notifications
          notifications={event.notifications}
          onChange={value => setEvent(prev => ({ ...prev, ...value }))}
          editable
        />
        <Description
          description={event.description}
          onChange={value => setEvent(prev => ({ ...prev, ...value }))}
          editable
        />
        <Attachments attachments={event.attachments} editable />
      </EventHandleContainer>
    </EventHandleViewContainer>
  );
};

export default EventHandleView;
