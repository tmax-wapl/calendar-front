import { Icon, Mui, styled, useWaplUiStore } from '@wapl/ui';
import { useCalendarStores } from '@/stores/StoreProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import { toLuxon } from '@/utils';
import { EVENT_UPDATE_OPTION } from '@/common/constants';
import { HTTPError } from '@/error';

const MenuItemWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ContextMenuItemContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

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

  const {
    toast: { notify },
  } = useWaplUiStore();

  const closeDialog = () => {
    uiStore.setDialogInfo(null);
  };

  const deleteCalendar = async () => {
    await calendarStore.deleteCalendar(id);
    closeDialog();
  };

  const deleteEvent = async () => {
    await calendarStore.deleteEvent(id);
    closeDialog();
    if (onClose) onClose();
  };

  const deleteRepeatEvent = async (value: string) => {
    const event = await eventStore.getEventInfo(id, date.startdate);
    switch (value) {
      case 'one': // 이 일정만 삭제
        await eventStore.updateEvent(id, event, EVENT_UPDATE_OPTION.ONCE_REPEAT_EVENT_EXCEPT);
        break;
      case 'after': // 이 일정 및 향후 일정 삭제
        await eventStore.updateEvent(id, event, EVENT_UPDATE_OPTION.AFTER_REPEAT_EVENT_EXCEPT);
        break;
      case 'all': // 모든 일정 삭제
        await calendarStore.deleteEvent(id);
        break;
      default:
        break;
    }
    closeDialog();
    uiStore.changeDateRange();
    if (onClose) onClose();
  };

  const handleNameChange = () => {
    calendarStore.setRenameId(id);
    if (onClose) onClose();
  };

  const handleCalendarSync = async () => {
    if (onClose) onClose();
    try {
      const { start, end } = uiStore.dateRange;
      const iCalendar = await calendarStore.syncCalendar(id, start, end);
      if (iCalendar.subscribeStatus === 'success') notify(`${iCalendar.name} 캘린더 동기화가 성공하였습니다.`);
    } catch (e) {
      if (e instanceof HTTPError && e.status === 500) calendarStore.updateCalendarDTO(id, 'subscribeStatus', 'wait');
    }
  };

  const handleCalendarDelete = () => {
    uiStore.setDialogInfo({
      action: type === 'subCalendar' ? 'calendarDelete' : 'subscriptionDelete',
      onClick: [closeDialog, deleteCalendar],
    });
    if (onClose) onClose();
  };

  const handleEventUpdate = async () => {
    const event = await eventStore.getEventInfo(id, date.startdate);
    eventStore.setEvent(event);
    if (!pathname.includes('update')) navigate(`/main/view-mode/${uiStore.viewMode}/update`);
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

  const handleEventDeleteClick = async () => {
    if (type === 'event') {
      uiStore.setDialogInfo({
        action: 'eventDelete',
        onClick: [closeDialog, deleteEvent],
      });
    } else {
      uiStore.setDialogInfo({
        action: 'repeatEventDelete',
        onClick: [closeDialog, deleteRepeatEvent],
        type: 'select',
      });
    }
  };

  const actions = {
    renameCalendar: {
      label: '이름 변경',
      onClick: handleNameChange,
      icon: <Icon.EditLine width={16} height={16} className="mr-8" />,
    },
    syncCalendar: {
      label: '캘린더 동기화',
      onClick: handleCalendarSync,
      icon: <Icon.RenewLine width={16} height={16} className="mr-8" />,
    },
    deleteCalendar: {
      label: '캘린더 삭제',
      onClick: handleCalendarDelete,
      icon: <Icon.DeleteLine width={16} height={16} className="mr-8" />,
    },
    updateEvent: { label: '일정 수정', onClick: handleEventUpdate, icon: <Icon.EditLine className="mr-8" /> },
    deleteEvent: { label: '일정 삭제', onClick: handleEventDeleteClick, icon: <Icon.DeleteLine className="mr-8" /> },
  };

  const menuItems = (() => {
    switch (type) {
      case 'mainCalendar':
        return [actions.renameCalendar];
      case 'subCalendar':
        return [actions.renameCalendar, actions.deleteCalendar];
      case 'subscribe':
        return [actions.renameCalendar, actions.syncCalendar, actions.deleteCalendar];
      case 'event':
      case 'repeatEvent':
        return [actions.updateEvent, actions.deleteEvent];
      default:
        return [];
    }
  })();

  return (
    <ContextMenuItemContainer>
      {menuItems.map(item => (
        <Mui.MenuItem key={item.label} onClick={item.onClick}>
          <MenuItemWrapper>
            {item.icon}
            {item.label}
          </MenuItemWrapper>
        </Mui.MenuItem>
      ))}
    </ContextMenuItemContainer>
  );
};
