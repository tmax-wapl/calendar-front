import { useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Icon, styled } from '@wapl/ui';
import { useCalendarStores } from '@/stores/StoreProvider';
import { CalendarModel } from '@/stores/model/CalendarModel';
import RoomCalendarItem from './RoomCalendarItem';
import { AddButton as ArrowButton, OtherTitle as Title } from './OtherCalendarList.style';
import { ButtonWarpper } from './Item.style';

const RoomCalendarList = observer(({ title, roomType }: { title: string; roomType: 'private' | 'org' }) => {
  const [visible, setVisible] = useState(true);
  const { calendarStore, uiStore } = useCalendarStores();

  const sortCalendarList = useMemo(
    (): CalendarModel[] =>
      roomType === 'private'
        ? calendarStore.roomCalendarList
            ?.filter(({ type }) => type === roomType)
            ?.sort((a, b) => new Date(b.regDate).getTime() - new Date(a.regDate).getTime())
        : calendarStore.roomCalendarList?.filter(({ type }) => type === roomType),
    [roomType, calendarStore.roomCalendarList],
  );

  const onContextMenuOpen = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const target = e.target as HTMLDivElement;
    if (!target) return;
    uiStore.setContextClickArg({
      target,
      position: { top: e.clientY, left: e.clientX },
      type: 'selectAll',
      data: roomType,
      hideColorPicker: true,
    });
  };

  return (
    <>
      {calendarStore.roomCalendarList?.some(cal => cal.type === roomType) ? (
        <RoomListContainer>
          <Title>
            <ArrowButton onClick={() => setVisible(!visible)}>
              {visible ? (
                <Icon.ArrowTopLine width={16} height={16} color="#80868B" />
              ) : (
                <Icon.ArrowBottomLine width={16} height={16} color="#80868B" />
              )}
            </ArrowButton>
            <TitleSpan>{title}</TitleSpan>
            <ButtonWarpper onClick={e => onContextMenuOpen(e)}>
              <Icon.MoreLine width={20} height={20} />
            </ButtonWarpper>
          </Title>
          {visible &&
            sortCalendarList?.map((calendar: CalendarModel) => (
              <RoomCalendarItem key={calendar.id} calendar={calendar} />
            ))}
        </RoomListContainer>
      ) : null}
    </>
  );
});

export default RoomCalendarList;

export const RoomListContainer = styled.div`
  display: flex;
  flex-direction: column;
  order: 3;
`;

export const TitleSpan = styled.span`
  margin-right: auto;
`;
