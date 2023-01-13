import { useState, memo, useContext } from 'react';
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
  category: CalendarModel;
}

const Item = observer(({ category }: Props) => {
  const { userId } = useContext(CalendarContext);
  const { uiStore, calendarStore } = useCalendarStores();
  const [renameTitle, setRenameTitle] = useState(category.name);

  const onContextMenuOpen = (e: any, category: CalendarModel) => {
    e.preventDefault(); // 기존 브라우저 우클릭 동작 제어
    const target = e.target;
    if (!target) return;
    const type = category.type === 'url' ? 'subscribe' : category.mainFlag ? 'mainCalendar' : 'subCalendar';
    uiStore.setContextClickArg({
      target,
      position: { top: e.clientY, left: e.clientX },
      id: category.id,
      color: category.color,
      type,
    });
  };

  const handleCheckedChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    await calendarStore.updateCalendar(category.id, { userId, checkFlag: checked });
    calendarStore.updateCalendarChecked(category.id, checked);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRenameTitle(e.target.value);
  };

  const handleRename = async () => {
    await calendarStore.updateCalendar(category.id, { userId, name: renameTitle });
    calendarStore.updateCalendarName(category.id, renameTitle);
    calendarStore.setRenameId(null);
  };

  const handleSyncClick = () => {
    const { start, end } = uiStore.dateRange;
    calendarStore.syncCalendar(category.id, start, end);
  };

  return (
    <ItemContainer main={category.mainFlag}>
      {calendarStore.renameId === category.id ? (
        <InputItemContainer calendarcolor={category.color}>
          <Checkbox checked={category.checkFlag} />
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
        <CheckItemContainer key={category.id} onContextMenu={e => onContextMenuOpen(e, category)}>
          <CheckBoxWrapper
            calendarcolor={category.color}
            control={<Checkbox checked={category.checkFlag} onChange={handleCheckedChange} />}
            label={category.name || ''}
            type={category.type}
          />
          {category.type === 'url' && (
            <ButtonWarpper onClick={handleSyncClick}>
              <Icon.RenewLine width={20} height={20} color="#80868B" />
            </ButtonWarpper>
          )}
          <ButtonWarpper onClick={e => onContextMenuOpen(e, category)}>
            <Icon.MoreLine width={20} height={20} />
          </ButtonWarpper>
        </CheckItemContainer>
      )}
    </ItemContainer>
  );
});

export default memo(Item, (prev, next) => prev.category === next.category);
