import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Icon } from '@wapl/ui';
import { useCalendarStores } from '@/stores/StoreProvider';
import { CalendarModel } from '@/stores/model/CalendarModel';
import {
  IconButton,
  FilterName,
  OtherCalendarListContainer as RoomCalendarListContainer,
} from './OtherCalendarList.style';
import Item from './Item';

interface Props {
  title: string;
  roomType: string;
}

const RoomCalendarList = observer(({ title, roomType }: Props) => {
  const [isOpen, setOpen] = useState(true);
  const { calendarStore } = useCalendarStores();

  const sortCalendarList = (): CalendarModel[] => {
    const filteredCalendars = calendarStore.roomCalendarList.filter(({ type }) => type === roomType);
    if (!filteredCalendars.length) return [];
    return filteredCalendars.sort((a, b) => new Date(b.regDate).getTime() - new Date(a.regDate).getTime());
  };

  const ExpandIcon = (): JSX.Element => {
    if (isOpen) return <Icon.ArrowTopLine color="#BDC1C6" width={20} height={20} />;
    return <Icon.ArrowBottomLine color="#BDC1C6" width={20} height={20} />;
  };

  return (
    <>
      {calendarStore.roomCalendarList?.some(cal => cal.type === roomType) ? (
        <RoomCalendarListContainer>
          {calendarStore.roomCalendarList.length > 0 && (
            <FilterName>
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
