import { useContext, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Checkbox, Icon, styled } from '@wapl/ui';
import { useCalendarStores } from '@/stores/StoreProvider';
import { CalendarModel } from '@/stores/model/CalendarModel';
import RoomCalendarItem from './RoomCalendarItem';
import { AddButton as ArrowButton, OtherTitle as Title } from './OtherCalendarList.style';
import { CheckBoxWrapper } from './Item.style';
import { CalendarContext } from '@/common/contexts/CalendarContext';

const RoomCalendarList = observer(({ title, roomType }: { title: string; roomType: 'private' | 'org' }) => {
  const { userId } = useContext(CalendarContext);
  const [visible, setVisible] = useState(true);
  const { calendarStore, uiStore } = useCalendarStores();
  const roomCalendarList = JSON.parse(localStorage.getItem('RoomCalendarList'));
  const [checkFlag, setCheckFlag] = useState((roomCalendarList[`${userId}_${roomType}`] as boolean) ?? true);

  const sortCalendarList = useMemo(
    (): CalendarModel[] =>
      roomType === 'private'
        ? calendarStore.roomCalendarList
            ?.filter(({ type }) => type === roomType)
            ?.sort((a, b) => new Date(b.regDate).getTime() - new Date(a.regDate).getTime())
        : calendarStore.roomCalendarList?.filter(({ type }) => type === roomType),
    [roomType, calendarStore.roomCalendarList],
  );

  const handleCheckAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { checked },
    } = e;
    calendarStore.toggleRoomCalendarCheckAll(userId, roomType, checked);
    setCheckFlag(checked);
    uiStore.changeDateRange();
  };

  return (
    <>
      {calendarStore.roomCalendarList?.some(cal => cal.type === roomType) ? (
        <RoomListContainer>
          <Title>
            <CheckBoxWrapper
              calendarcolor={calendarStore.defaultColor}
              control={<Checkbox checked={checkFlag} onChange={handleCheckAllChange} />}
              label={''}
              type={roomType}
              sx={{ width: '28px !important;' }}
            />
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
