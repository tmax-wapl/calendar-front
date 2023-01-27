import { useState, memo, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { useCalendarStores } from '@/stores/StoreProvider';
import { CalendarContext } from '@/common/contexts/CalendarContext';
import { CalendarModel } from '@/stores/model/CalendarModel';
import { Checkbox, Icon, Tooltip, useWaplUiStore } from '@wapl/ui';
import {
  ItemContainer,
  InputItemContainer,
  Input,
  CheckItemContainer,
  CheckBoxWrapper,
  ButtonWarpper,
  ErrorIcon,
} from './Item.style';

interface Props {
  category: CalendarModel;
}

const Item = observer(({ category }: Props) => {
  const { userId } = useContext(CalendarContext);
  const { uiStore, calendarStore } = useCalendarStores();
  const [renameTitle, setRenameTitle] = useState(category.name);
  const {
    toast: { notify },
  } = useWaplUiStore();

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
    uiStore.changeDateRange();
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRenameTitle(e.target.value);
  };

  const handleRename = async () => {
    await calendarStore.updateCalendar(category.id, { userId, name: renameTitle });
    calendarStore.updateCalendarDTO(category.id, 'name', renameTitle);
    calendarStore.setRenameId(null);
  };

  const handleSyncClick = async () => {
    try {
      const { start, end } = uiStore.dateRange;
      const iCalendar = await calendarStore.syncCalendar(category.id, start, end);
      if (iCalendar.subscribeStatus === 'success') notify(`${iCalendar.name} 캘린더 동기화가 성공하였습니다.`);
    } catch (status: any) {
      if (status === 500) calendarStore.updateCalendarDTO(category.id, 'subscribeStatus', 'wait');
    }
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
            <>
              {category.subscribeStatus !== 'success' && (
                <Tooltip
                  title={category.subscribeStatus === 'fail' ? '원본이 삭제된 캘린더입니다.' : '잠시 후 시도해 주세요.'}
                >
                  <ErrorIcon width={20} height={20} color=" #F44336" />
                </Tooltip>
              )}
              <ButtonWarpper onClick={handleSyncClick}>
                <Icon.RenewLine width={20} height={20} color="#80868B" />
              </ButtonWarpper>
            </>
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
