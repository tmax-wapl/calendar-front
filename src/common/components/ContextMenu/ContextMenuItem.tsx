import { Icon, Mui, styled } from '@wapl/ui';
import { useCalendarStores } from '@/stores/StoreProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import { toISO, toLuxon } from '@/utils';
import { EventModel } from '@/stores/model/EventModel';
import { EVENT_UPDATE_OPTION } from '@/common/constants';

const MenuItemWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ContextMenuItemContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

interface MenuItem {
  label: string;
  icon: JSX.Element;
  onClick: () => void;
}

interface Props {
  id: number;
  type?: string;
  date?: {
    startdate?: string;
    enddate?: string;
  };
  onClose?: () => void;
}

export const ContextMenuItem = ({ id, type, date, onClose }: Props) => {
  const { uiStore, calendarStore, eventStore } = useCalendarStores();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const calendarDelete = () => {
    console.log('캘린더 삭제');
  };

  const eventDelete = () => {
    calendarStore.deleteEvent(id);
    closeDialog();
    if (onClose) onClose();
  };

  const repeatEventDelete = async (value: string) => {
    const model = uiStore.dialogInfo.data.model;
    switch (value) {
      case 'one': // 이 일정만 삭제
        await eventStore.updateEvent(
          id,
          new EventModel({
            ...model.dto,
            exDate: toISO(toLuxon(date.startdate)),
          }),
          EVENT_UPDATE_OPTION.REPEAT_EVENT_REMOVE,
        );
        break;
      case 'after': // 이 일정 및 향후 일정 삭제
        await eventStore.updateEvent(
          id,
          new EventModel({
            ...model.dto,
            repeatEndDate: toISO(toLuxon(date.enddate)),
          }),
          EVENT_UPDATE_OPTION.AFTER_REPEAT_ALL_REMOVE,
        );
        break;
      case 'all': // 모든 일정 삭제
        eventDelete();
        break;
      default:
        break;
    }
    uiStore.dialogInfo = null;
    uiStore.changeDateRange();
    if (onClose) onClose();
  };

  const closeDialog = () => {
    uiStore.dialogInfo = null;
  };

  const handleNameChange = () => {
    calendarStore.setRenameId(id);
    if (onClose) onClose();
  };

  const handleCalendarDelete = () => {
    uiStore.dialogInfo = {
      action: 'shareCalendarDelete',
      onClick: [closeDialog, calendarDelete],
    };
  };

  const handleEventEdit = async () => {
    const event = await eventStore.getEventInfo(id);
    eventStore.setEvent(event);
    if (!pathname.includes('update')) navigate('/main/update');
    if (onClose) onClose();
    handleDateRange();
  };

  const handleDateRange = () => {
    eventStore.event.startDate = toLuxon(date.startdate);
    eventStore.event.endDate = toLuxon(date.enddate);
  };

  const handleEventShare = () => {
    console.log('일정 공유');
  };

  const handleEventDelete = async () => {
    const model = await eventStore.getEventInfo(id);
    if (!model.rrule) {
      uiStore.dialogInfo = {
        action: 'eventDelete',
        onClick: [closeDialog, eventDelete],
        data: { num: 1 },
      };
    } else {
      uiStore.dialogInfo = {
        action: 'repeatEventDelete',
        onClick: [closeDialog, repeatEventDelete],
        type: 'select',
        data: { model },
      };
    }
  };

  const menuItem: { [key: string]: MenuItem[] } = {
    persona: [{ label: '이름 변경', onClick: handleNameChange, icon: <Icon.EditLine className="mr-8" /> }],
    subscribe: [
      { label: '이름 변경', onClick: handleNameChange, icon: <Icon.EditLine className="mr-8" /> },
      { label: '캘린더 삭제', onClick: handleCalendarDelete, icon: <Icon.DeleteLine className="mr-8" /> },
    ],
    event: [
      { label: '일정 수정', onClick: handleEventEdit, icon: <Icon.EditLine className="mr-8" /> },
      { label: '일정 공유', onClick: handleEventShare, icon: <Icon.ShareLine className="mr-8" /> },
      { label: '일정 삭제', onClick: handleEventDelete, icon: <Icon.DeleteLine className="mr-8" /> },
    ],
  };

  const RenderItem = (): JSX.Element[] => {
    return menuItem[type]?.map(item => (
      <Mui.MenuItem key={item.label} onClick={item.onClick}>
        <MenuItemWrapper>
          {item.icon}
          {item.label}
        </MenuItemWrapper>
      </Mui.MenuItem>
    ));
  };

  return <ContextMenuItemContainer>{RenderItem()}</ContextMenuItemContainer>;
};
