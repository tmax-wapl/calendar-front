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
    if (calendarStore.roomCalendarList && calendarStore.calendarList)
      return [...calendarStore.roomCalendarList, ...calendarStore.calendarList]
        .filter(
          (calendar: CalendarModel) => calendar.type === 'url' || calendar.type === 'share' || calendar.type === 'room',
        )
        ?.sort((a, b) => {
          return new Date(b.regDate).getTime() - new Date(a.regDate).getTime();
        });
    return [];
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
        {sortCalendarList().map((calendar: CalendarModel) =>
          calendar.type === 'room' ? (
            <></>
          ) : (
            // <RoomCalendarItem key={calendar.roomId} calendar={calendar} />
            <Item key={calendar.id} calendar={calendar} />
          ),
        )}
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
