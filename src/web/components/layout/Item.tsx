import { useState, memo, MouseEvent } from 'react';
import { observer } from 'mobx-react-lite';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCalendarStores } from '@/stores/StoreProvider';
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
import { HTTPError } from '@/error';

interface Props {
  category: CalendarModel;
}

const Item = observer(({ category }: Props) => {
  const { uiStore, calendarStore, eventStore } = useCalendarStores();
  const [renameTitle, setRenameTitle] = useState(category.name);
  const {
    toast: { notify },
  } = useWaplUiStore();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const onContextMenuOpen = (e: MouseEvent, category: CalendarModel) => {
    e.preventDefault(); // 기존 브라우저 우클릭 동작 제어

    const target = e.target as HTMLDivElement;
    if (!target) return;

    const type = (() => {
      if (category.type === 'url') return 'subscribe';
      if (category.type === 'share') return 'sharedEventCalendar';
      if (category.mainFlag) return 'mainCalendar';
      else return 'subCalendar';
    })();

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
    await calendarStore.updateCalendar(category.id, { checkFlag: checked });
    calendarStore.updateCalendarChecked(category.id, checked);
    uiStore.changeDateRange();
    if (
      !checked &&
      (pathname.includes('detail') || pathname.includes('update')) &&
      (category.id === eventStore.event.calId ||
        (category.type === 'share' && eventStore.event.roomId === null && eventStore.event.shareEvent))
    )
      navigate(`/main/view-mode/${uiStore.viewMode}/date`);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRenameTitle(e.target.value);
  };

  const handleRename = async () => {
    await calendarStore.updateCalendar(category.id, { name: renameTitle });
    calendarStore.updateCalendarDTO(category.id, 'name', renameTitle);
    calendarStore.setRenameId(null);
  };

  const handleSyncClick = async () => {
    try {
      const { start, end } = uiStore.dateRange;
      const iCalendar = await calendarStore.syncCalendar(category.id, start, end);
      if (iCalendar.subscribeStatus === 'success') notify(`${iCalendar.name} 캘린더 동기화가 성공하였습니다.`);
      uiStore.changeDateRange();
    } catch (e) {
      if (e instanceof HTTPError && e.status === 500)
        calendarStore.updateCalendarDTO(category.id, 'subscribeStatus', 'wait');
    }
  };

  return (
    <ItemContainer main={category.mainFlag || category.type === 'share'}>
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
