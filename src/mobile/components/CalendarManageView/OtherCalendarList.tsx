import { observer } from 'mobx-react-lite';
import { OtherCalendarListContainer, Title } from './OtherCalendarList.style';
import SharedCalendarList from './SharedCalendarList';
import RoomCalendarList from './RoomCalendarList';

const OtherCalendarList = observer(() => {
  return (
    <>
      <OtherCalendarListContainer>
        <Title>다른 캘린더</Title>
        <SharedCalendarList />
        <RoomCalendarList title="룸 캘린더" roomType="private" />
        <RoomCalendarList title="조직 캘린더" roomType="org" />
      </OtherCalendarListContainer>
    </>
  );
});

export default OtherCalendarList;
