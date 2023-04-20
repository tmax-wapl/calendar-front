import { useState, memo, useContext, MouseEvent, Dispatch } from 'react';
import { observer } from 'mobx-react-lite';
import { useCalendarStores } from '@/stores/StoreProvider';
import { CalendarContext } from '@/common/contexts/CalendarContext';
import { CalendarModel } from '@/stores/model/CalendarModel';
import { Checkbox, Icon } from '@wapl/ui';
import {
  ItemContainer,
  InputItemContainer,
  Input,
  CheckItemContainer,
  CheckBoxWrapper,
  ButtonWarpper,
} from './Item.style';

interface Props {
  calendar: CalendarModel;
  setRoomCalendarList?: Dispatch<React.SetStateAction<CalendarModel[]>>;
}

const RoomCalendarItem = observer(({ calendar }: Props) => {
  const { userId } = useContext(CalendarContext);
  const { uiStore, calendarStore } = useCalendarStores();
  const [renameTitle, setRenameTitle] = useState(calendar.name);

  const onContextMenuOpen = (e: MouseEvent, calendar: CalendarModel) => {
    e.preventDefault(); // 기존 브라우저 우클릭 동작 제어

    const target = e.target as HTMLDivElement;
    if (!target) return;
    uiStore.setContextClickArg({
      target,
      position: { top: e.clientY, left: e.clientX },
      id: calendar.roomId,
      color: calendar.color,
      type: calendar.type === 'room' ? 'roomCalendar' : 'orgCalendar',
      data: calendar,
    });
  };

  const isContained = calendarStore.roomCalendarList?.some((cal: CalendarModel) => cal.id === calendar.id);

  const handleCheckedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isContained) {
      const newRoomList = calendarStore.roomCalendarList?.map((room: CalendarModel) =>
        room.roomId === calendar.roomId ? { ...room.dto, checkFlag: e.target.checked } : room.dto,
      );
      calendarStore.setLocalRoomCalendarList(userId, newRoomList);
    } else {
      calendar.dto.checkFlag = e.target.checked;
      calendarStore.addLocalRoomCalendarItem(userId, calendar.dto);
    }
    uiStore.changeDateRange();
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRenameTitle(e.target.value);
  };

  const handleRename = () => {
    if (isContained) {
      const newRoomList = calendarStore.roomCalendarList?.map((room: CalendarModel) =>
        room.roomId === calendar.roomId ? { ...room.dto, name: renameTitle } : room.dto,
      );
      calendarStore.setLocalRoomCalendarList(userId, newRoomList);
    } else {
      calendar.dto.name = renameTitle;
      calendarStore.addLocalRoomCalendarItem(userId, calendar.dto);
    }
    calendarStore.setRenameId(null);
  };

  return (
    <ItemContainer main={calendar.mainFlag}>
      {calendarStore.renameId === calendar.roomId ? (
        <InputItemContainer calendarcolor={calendar.color}>
          <Checkbox checked={calendar.checkFlag} />
          <Input
            onChange={handleNameChange}
            value={renameTitle}
            onBlur={handleRename}
            onKeyDown={e => {
              if (e.key === 'Enter') handleRename();
            }}
            autoFocus
          />
        </InputItemContainer>
      ) : (
        <CheckItemContainer key={calendar.roomId} onContextMenu={e => onContextMenuOpen(e, calendar)}>
          <CheckBoxWrapper
            calendarcolor={calendar.color}
            control={<Checkbox checked={calendar.checkFlag} onChange={handleCheckedChange} />}
            label={calendar.name || ''}
            type={calendar.type}
          />
          <ButtonWarpper onClick={e => onContextMenuOpen(e, calendar)}>
            <Icon.MoreLine width={20} height={20} />
          </ButtonWarpper>
        </CheckItemContainer>
      )}
    </ItemContainer>
  );
});

export default memo(RoomCalendarItem, (prev, next) => prev.calendar === next.calendar);
