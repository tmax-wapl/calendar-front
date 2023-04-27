import { useCalendarStores } from '@/stores/StoreProvider';
import { CalendarModel } from '@/stores/model/CalendarModel';
import { observer } from 'mobx-react-lite';
import Item from './Item';
import { Icon } from '@wapl/ui';
import { OtherCalendarListContainer, Title, AddButton } from './OtherCalendarList.style';
import RoomCalendarItem from './RoomCalendarItem';

const OtherCalendarList = observer(() => {
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

  const sortCalendarList = (): CalendarModel[] => {
    const filteredCalendars = calendarStore.calendarList
      ?.concat(calendarStore.roomCalendarList)
      .filter(({ type }) => ['url', 'share', 'private'].includes(type));

    if (!filteredCalendars.length) return [];

    return filteredCalendars.sort((a, b) => new Date(b.regDate).getTime() - new Date(a.regDate).getTime());
  };

  return (
    <OtherCalendarListContainer>
      <Title>
        다른 캘린더
        <AddButton onClick={onContextMenuOpen}>
          <Icon.Add2Line width={20} height={20} color="#80868B" />
        </AddButton>
      </Title>
      {sortCalendarList().map((calendar: CalendarModel) =>
        calendar.type === 'private' ? (
          <RoomCalendarItem key={calendar.roomId} calendar={calendar} />
        ) : (
          <Item key={calendar.id} category={calendar} />
        ),
      )}
    </OtherCalendarListContainer>
  );
});

export default OtherCalendarList;
