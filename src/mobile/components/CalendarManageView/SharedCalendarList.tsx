import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Icon } from '@wapl/ui';
import { useCalendarStores } from '@/stores/StoreProvider';
import { CalendarModel } from '@/stores/model/CalendarModel';
import {
  IconButton,
  FilterName,
  OtherCalendarListContainer as SharedCalendarListContainer,
} from './OtherCalendarList.style';
import Item from './Item';

const SharedCalendarList = observer(() => {
  const [isOpen, setOpen] = useState(true);
  const { calendarStore } = useCalendarStores();

  const sortCalendarList = (): CalendarModel[] => {
    const filteredCalendars = calendarStore.calendarList.filter(({ type }) => ['share'].includes(type)); // TODO: url추가
    if (!filteredCalendars.length) return [];
    return filteredCalendars.sort((a, b) => new Date(b.regDate).getTime() - new Date(a.regDate).getTime());
  };

  const ExpandIcon = (): JSX.Element => {
    if (isOpen) return <Icon.ArrowTopLine color="#BDC1C6" width={20} height={20} />;
    return <Icon.ArrowBottomLine color="#BDC1C6" width={20} height={20} />;
  };

  return (
    <>
      {calendarStore.calendarList?.some(cal => cal.type === 'share') ? (
        <SharedCalendarListContainer>
          {calendarStore.roomCalendarList.length > 0 && (
            <FilterName>
              <IconButton onClick={() => setOpen(!isOpen)}>
                <ExpandIcon />
              </IconButton>
              공유 받은 캘린더
            </FilterName>
          )}
          {isOpen &&
            sortCalendarList()?.map((calendar: CalendarModel) => <Item key={calendar.id} calendar={calendar} />)}
        </SharedCalendarListContainer>
      ) : null}
    </>
  );
});

export default SharedCalendarList;
