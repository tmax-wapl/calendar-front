import { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Checkbox, Icon } from '@wapl/ui';
import { useCalendarStores } from '@/stores/StoreProvider';
import { CalendarModel } from '@/stores/model/CalendarModel';
import {
  IconButton,
  FilterName,
  OtherCalendarListContainer as RoomCalendarListContainer,
} from './OtherCalendarList.style';
import Item from './Item';
import { CheckBoxWrapper } from './Item.style';
import { CalendarContext } from '@/common/contexts/CalendarContext';

interface Props {
  title: string;
  roomType: 'private' | 'org';
}

const RoomCalendarList = observer(({ title, roomType }: Props) => {
  const { userId } = useContext(CalendarContext);
  const [isOpen, setOpen] = useState(true);
  const { calendarStore, uiStore } = useCalendarStores();
  const roomCalendarList = JSON.parse(localStorage.getItem('RoomCalendarList'));
  const [checkFlag, setCheckFlag] = useState((roomCalendarList[`${userId}_${roomType}`] as boolean) ?? true);

  const sortCalendarList = (): CalendarModel[] => {
    const filteredCalendars = calendarStore.roomCalendarList.filter(({ type }) => type === roomType);
    if (!filteredCalendars.length) return [];
    return filteredCalendars.sort((a, b) => new Date(b.regDate).getTime() - new Date(a.regDate).getTime());
  };

  const ExpandIcon = (): JSX.Element => {
    if (isOpen) return <Icon.ArrowTopLine color="#BDC1C6" width={20} height={20} />;
    return <Icon.ArrowBottomLine color="#BDC1C6" width={20} height={20} />;
  };

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
        <RoomCalendarListContainer>
          {calendarStore.roomCalendarList.length > 0 && (
            <FilterName>
              {/* <CheckBoxWrapper
                calendarcolor={calendarStore.defaultColor}
                control={<Checkbox checked={checkFlag} onChange={handleCheckAllChange} />}
                label={''}
                type={roomType}
                sx={{ width: '28px !important;' }}
              /> */}
              {title}
              <IconButton onClick={() => setOpen(!isOpen)}>
                <ExpandIcon />
              </IconButton>
            </FilterName>
          )}
          {isOpen &&
            sortCalendarList()?.map((calendar: CalendarModel) => <Item key={calendar.id} calendar={calendar} />)}
        </RoomCalendarListContainer>
      ) : null}
    </>
  );
});

export default RoomCalendarList;
