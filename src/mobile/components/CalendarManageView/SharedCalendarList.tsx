import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Icon } from '@wapl/ui';
import { useCalendarStores } from '@/stores/StoreProvider';
import { CalendarModel } from '@/stores/model/CalendarModel';
import {
  IconButton,
  FilterName,
  TitleSpan,
  OtherCalendarListContainer as SharedCalendarListContainer,
} from './OtherCalendarList.style';
import { ButtonWrapper } from './Item.style';
import { ContextMenu } from '../ContextMenu';
import Item from './Item';

const SharedCalendarList = observer(() => {
  const [isOpen, setOpen] = useState(true);
  const [isContextMenuOpen, setContextMenuOpen] = useState<boolean>(false);
  const { calendarStore, uiStore } = useCalendarStores();

  const sortCalendarList = (): CalendarModel[] => {
    const filteredCalendars = calendarStore.calendarList.filter(({ type }) => ['share', 'url'].includes(type)); // TODO: url추가
    if (!filteredCalendars.length) return [];
    return filteredCalendars.sort((a, b) => new Date(b.regDate).getTime() - new Date(a.regDate).getTime());
  };

  const ExpandIcon = (): JSX.Element => {
    if (isOpen) return <Icon.ArrowTopLine color="#BDC1C6" width={20} height={20} />;
    return <Icon.ArrowBottomLine color="#BDC1C6" width={20} height={20} />;
  };

  const handleContextMenuOpen = () => setContextMenuOpen(true);

  const handleContextMenuClose = () => setContextMenuOpen(false);

  const SelectItem = ({ color, label }: { color?: string; label?: string }) => (
    <div style={{ height: '48px', display: 'flex', flex: 1, alignItems: 'center' }}>
      {color === 'addSubscribe' ? (
        <Icon.Add2Line width={20} height={20} className="mr-8" />
      ) : color === 'selectAll' ? (
        <Icon.SelectLine width={20} height={20} className="mr-8" />
      ) : (
        <Icon.UnselectLine width={20} height={20} className="mr-8" />
      )}
      <span>{label}</span>
    </div>
  );

  const handleItemClick = (value: string) => {
    if (value === 'addSubscribe') uiStore.setPageDialogInfo('addSubscribe');
    else {
      const checkFlag = value === 'selectAll';
      calendarStore.sharedCalendarListCheckAll(checkFlag);
      uiStore.changeDateRange();
    }
    setContextMenuOpen(false);
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
              <TitleSpan>공유 받은 캘린더</TitleSpan>
              <ButtonWrapper onClick={handleContextMenuOpen}>
                <Icon.MoreLine width={20} height={20} color="#BDC1C6" />
              </ButtonWrapper>
            </FilterName>
          )}
          {isOpen &&
            sortCalendarList()?.map((calendar: CalendarModel) => <Item key={calendar.id} calendar={calendar} />)}
          <ContextMenu
            open={isContextMenuOpen}
            selected=""
            height={144}
            title="더보기"
            items={[
              { value: 'addSubscribe', label: '캘린더 추가' },
              { value: 'selectAll', label: '전체 선택' },
              {
                value: 'deSelectAll',
                label: '전체 선택 해제',
              },
            ]}
            type="selectAll"
            onClose={handleContextMenuClose}
            onClick={handleItemClick}
          />
        </SharedCalendarListContainer>
      ) : null}
    </>
  );
});

export default SharedCalendarList;
