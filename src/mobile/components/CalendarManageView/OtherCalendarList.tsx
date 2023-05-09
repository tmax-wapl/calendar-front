import { useState } from 'react';
import { useCalendarStores } from '@/stores/StoreProvider';
import { CalendarModel } from '@/stores/model/CalendarModel';
import { observer } from 'mobx-react-lite';
import Item from './Item';
import { Icon, ContextMenu, ContentMenuHeader, ContentMenuItem } from '@wapl/ui';
import { OtherCalendarListContainer, FilterName, AddButton, MenuContent } from './OtherCalendarList.style';
// import RoomCalendarItem from './Item';

const OtherCalendarList = observer(() => {
  const { calendarStore, uiStore } = useCalendarStores();
  const [isOpen, setOpen] = useState<boolean>(false);

  const sortCalendarList = (): CalendarModel[] => {
    const filteredCalendars = calendarStore.calendarList
      ?.concat(calendarStore.roomCalendarList)
      .filter(({ type }) => ['url', 'share', 'private'].includes(type));

    if (!filteredCalendars.length) return [];

    return filteredCalendars.sort((a, b) => new Date(b.regDate).getTime() - new Date(a.regDate).getTime());
  };

  const onContextMenuOpen = () => {
    setOpen(true);
  };

  const onContextMenuClose = () => {
    setOpen(false);
  };

  const handleUrlSubscribe = () => {
    uiStore.setPageDialogInfo('addSubscribe');
    setOpen(false);
  };

  return (
    <>
      <OtherCalendarListContainer>
        <FilterName>
          다른 캘린더
          <AddButton onClick={onContextMenuOpen}>
            <Icon.Add2Line width={20} height={20} color="#80868B" />
          </AddButton>
        </FilterName>
        {sortCalendarList().map((calendar: CalendarModel) => (
          <Item key={calendar.id} calendar={calendar} />
        ))}
      </OtherCalendarListContainer>
      <ContextMenu open={isOpen} onClose={onContextMenuClose}>
        <ContentMenuHeader>다른 캘린더 추가</ContentMenuHeader>
        <ContentMenuItem onClick={handleUrlSubscribe}>
          <MenuContent>
            <Icon.LinkLine width={20} height={20} className="mr-8" />
            URL로 추가
          </MenuContent>
        </ContentMenuItem>
      </ContextMenu>
    </>
  );
});

export default OtherCalendarList;
