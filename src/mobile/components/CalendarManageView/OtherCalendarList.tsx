import { observer } from 'mobx-react-lite';
import { AddButton, OtherCalendarListContainer, Title } from './OtherCalendarList.style';
import SharedCalendarList from './SharedCalendarList';
import RoomCalendarList from './RoomCalendarList';
import { Icon } from '@wapl/ui';
import { useCalendarStores } from '@/stores/StoreProvider';

const OtherCalendarList = observer(() => {
  const { calendarStore } = useCalendarStores();

  return (
    <>
      <OtherCalendarListContainer>
        <Title>
          다른 캘린더
          <AddButton onClick={() => calendarStore.handleUrlSubscribe()}>
            <Icon.Add2Line width={20} height={20} color="#80868B" />
          </AddButton>
        </Title>
        <SharedCalendarList />
        <RoomCalendarList title="룸 캘린더" roomType="private" />
        <RoomCalendarList title="조직 캘린더" roomType="org" />
      </OtherCalendarListContainer>
    </>
  );
});

export default OtherCalendarList;
