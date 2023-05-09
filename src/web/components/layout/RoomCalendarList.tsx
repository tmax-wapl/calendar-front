import { useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Icon, styled } from '@wapl/ui';
import { useCalendarStores } from '@/stores/StoreProvider';
import { CalendarModel } from '@/stores/model/CalendarModel';
import RoomCalendarItem from './RoomCalendarItem';
import { AddButton as ArrowButton, OtherTitle as Title } from './OtherCalendarList.style';

const RoomCalendarList = observer(({ title, roomType }: { title: string; roomType: string }) => {
  const [visible, setVisible] = useState(true);
  const { calendarStore } = useCalendarStores();

  const sortCalendarList = useMemo(
    (): CalendarModel[] =>
      calendarStore.roomCalendarList
        ?.filter(({ type }) => type === roomType)
        ?.sort((a, b) => new Date(b.regDate).getTime() - new Date(a.regDate).getTime()),
    [roomType, calendarStore.roomCalendarList],
  );

  return (
    <>
      {calendarStore.roomCalendarList?.some(cal => cal.type === roomType) ? (
        <RoomListContainer>
          <Title>
            {title}
            <ArrowButton onClick={() => setVisible(!visible)}>
              {visible ? (
                <Icon.ArrowTopLine width={16} height={16} color="#80868B" />
              ) : (
                <Icon.ArrowBottomLine width={16} height={16} color="#80868B" />
              )}
            </ArrowButton>
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
