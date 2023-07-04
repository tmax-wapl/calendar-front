import { useCalendarStores } from '@/stores/StoreProvider';
import { observer } from 'mobx-react-lite';
import { OtherCalendarListContainer, Title } from './OtherCalendarList.style';
import RoomCalendarList from './RoomCalendarList';
import ShareCalendarList from './ShareCalendarList';

const OtherCalendarList = observer(() => {
  const { uiStore } = useCalendarStores();

  const onContextMenuOpen = (e: React.MouseEvent<Element, MouseEvent>) => {
    const target = e.target as HTMLDivElement;
    if (!target) return;
    uiStore.setContextClickArg({
      target,
      position: { top: e.clientY, left: e.clientX },
      hideColorPicker: true,
      type: 'addOther',
    });
  };

  return (
    <OtherCalendarListContainer>
      <Title>
        다른 캘린더
        {/* <AddButton onClick={onContextMenuOpen}>
          <Icon.Add2Line width={20} height={20} color="#80868B" />
        </AddButton> */}
      </Title>
      <ShareCalendarList />
      <RoomCalendarList title="룸 캘린더" roomType="private" />
      <RoomCalendarList title="조직 캘린더" roomType="org" />
    </OtherCalendarListContainer>
  );
});

export default OtherCalendarList;
