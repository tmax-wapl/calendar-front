import { useCalendarStores } from '@/stores/StoreProvider';
import { CalendarModel } from '@/stores/model/CalendarModel';
import { observer } from 'mobx-react-lite';
import Item from './Item';
import { Icon } from '@wapl/ui';
import { Title, AddButton } from './SubscriptionList.style';

const SubscriptionList = observer(() => {
  const { uiStore, calendarStore } = useCalendarStores();

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
    <>
      <Title>
        다른 캘린더
        <AddButton onClick={onContextMenuOpen}>
          <Icon.Add2Line width={20} height={20} color="#80868B" />
        </AddButton>
      </Title>
      {calendarStore.calendarList
        ?.filter((category: CalendarModel) => category.type === 'url')
        .map((category: CalendarModel) => (
          <Item key={category.id} category={category} />
        ))}
    </>
  );
});

export default SubscriptionList;
