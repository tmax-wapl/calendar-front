import { memo, useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Icon } from '@wapl/ui';
import { useCalendarStores } from '@/stores/StoreProvider';
import { CalendarModel } from '@/stores/model/CalendarModel';
import {
  IconButton,
  FilterName,
  OtherCalendarListContainer as RoomCalendarListContainer,
  TitleSpan,
} from './OtherCalendarList.style';
import Item from './Item';
import { ButtonWrapper } from './Item.style';
import { ContextMenu } from '../ContextMenu';
import { CalendarContext } from '@/common/contexts/CalendarContext';

interface Props {
  title: string;
  roomType: 'private' | 'org';
}

const RoomCalendarList = observer(({ title, roomType }: Props) => {
  const { userId } = useContext(CalendarContext);
  const [isOpen, setOpen] = useState(true);
  const { calendarStore, uiStore } = useCalendarStores();
  const [isContextMenuOpen, setContextMenuOpen] = useState<boolean>(false);

  const sortCalendarList = (): CalendarModel[] => {
    const filteredCalendars = calendarStore.roomCalendarList.filter(({ type }) => type === roomType);
    if (!filteredCalendars.length) return [];
    return filteredCalendars.sort((a, b) => new Date(b.regDate).getTime() - new Date(a.regDate).getTime());
  };

  const ExpandIcon = (): JSX.Element => {
    if (isOpen) return <Icon.ArrowTopLine color="#BDC1C6" width={20} height={20} />;
    return <Icon.ArrowBottomLine color="#BDC1C6" width={20} height={20} />;
  };

  const handleContextMenuOpen = () => setContextMenuOpen(true);

  const handleContextMenuClose = () => setContextMenuOpen(false);

  const handleSelectAll = (value: string) => {
    const checkFlag = value === 'selectAll';
    calendarStore.roomCalendarListCheckAll(userId, roomType, checkFlag);
    setContextMenuOpen(false);
  };

  const SelectItem = memo(({ color, label }: { color?: string; label?: string }) => (
    <div style={{ height: '48px', display: 'flex', flex: 1, alignItems: 'center' }}>
      {color === 'selectAll' ? (
        <Icon.SelectLine width={18} height={18} className="mr-8 mt-2" />
      ) : (
        <Icon.UnselectLine width={18} height={18} className="mr-8 mt-2" />
      )}
      <span>{label}</span>
    </div>
  ));

  return (
    <>
      {calendarStore.roomCalendarList?.some(cal => cal.type === roomType) ? (
        <RoomCalendarListContainer>
          {calendarStore.roomCalendarList.length > 0 && (
            <FilterName>
              <IconButton onClick={() => setOpen(!isOpen)}>
                <ExpandIcon />
              </IconButton>
              <TitleSpan>{title}</TitleSpan>
              <ButtonWrapper onClick={handleContextMenuOpen}>
                <Icon.MoreLine width={20} height={20} color="#BDC1C6" />
              </ButtonWrapper>
            </FilterName>
          )}
          {isOpen &&
            sortCalendarList()?.map((calendar: CalendarModel) => <Item key={calendar.id} calendar={calendar} />)}
          <ContextMenu
            open={isContextMenuOpen}
            selected={''}
            height={104}
            title="더보기"
            items={[
              { value: 'selectAll', label: '전체 선택' },
              {
                value: 'deSelectAll',
                label: '전체 선택 해제',
              },
            ]}
            onClose={handleContextMenuClose}
            onClick={handleSelectAll}
            Component={SelectItem}
            isColor
          />
        </RoomCalendarListContainer>
      ) : null}
    </>
  );
});

export default RoomCalendarList;
