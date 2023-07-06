import { useCalendarStores } from '@/stores/StoreProvider';
import { Icon } from '@wapl/ui';
import { observer } from 'mobx-react-lite';
import { AddButton, OtherCalendarListContainer, Title } from './OtherCalendarList.style';
import RoomCalendarList from './RoomCalendarList';
import ShareCalendarList from './ShareCalendarList';

const OtherCalendarList = observer(() => {
  const { calendarStore } = useCalendarStores();

  return (
    <OtherCalendarListContainer>
      <Title>
        다른 캘린더
        <AddButton onClick={() => calendarStore.handleUrlSubscribe()}>
          <Icon.Add2Line width={20} height={20} color="#80868B" />
        </AddButton>
      </Title>
      <ShareCalendarList />
      <RoomCalendarList title="룸 캘린더" roomType="private" />
      <RoomCalendarList title="조직 캘린더" roomType="org" />
    </OtherCalendarListContainer>
  );
});

export default OtherCalendarList;
