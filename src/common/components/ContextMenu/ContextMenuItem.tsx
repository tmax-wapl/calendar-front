import { Icon, Mui, styled } from '@wapl/ui';
import { useCalendarStores } from '@/stores/StoreProvider';
import { useLocation, useNavigate } from 'react-router-dom';

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
  onClose?: () => void;
}

export const ContextMenuItem = ({ id, type, onClose }: Props) => {
  const { uiStore, calendarStore, eventStore } = useCalendarStores();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const deleteCalendar = async () => {
    await calendarStore.deleteCalendar(id);
    closeDialog();
  };

  const deleteEvent = () => {
    calendarStore.deleteEvent(id);
    closeDialog();
    if (onClose) onClose();
  };

  const closeDialog = () => {
    uiStore.dialogInfo = null;
  };

  const handleNameChange = () => {
    calendarStore.setRenameId(id);
    if (onClose) onClose();
  };

  const handleCalendarSync = () => {
    console.log('캘린더 동기화');
  };

  const handleCalendarDelete = (type: string) => {
    uiStore.dialogInfo = {
      action: type === 'subCalendar' ? 'calendarDelete' : 'subscriptionDelete',
      onClick: [closeDialog, deleteCalendar],
    };
    if (onClose) onClose();
  };

  const handleEventEdit = async () => {
    const event = await eventStore.getEventInfo(id);
    eventStore.setEvent(event);
    if (!pathname.includes('update')) navigate('/main/update');
    if (onClose) onClose();
  };

  const handleEventShare = () => {
    console.log('일정 공유');
  };

  const handleEventDelete = () => {
    uiStore.dialogInfo = {
      action: 'eventDelete',
      onClick: [closeDialog, deleteEvent],
      data: { num: 1 },
    };
  };

  const menuItem: { [key: string]: MenuItem[] } = {
    mainCalendar: [
      {
        label: '이름 변경',
        onClick: handleNameChange,
        icon: <Icon.EditLine width={16} height={16} className="mr-8" />,
      },
    ],
    subCalendar: [
      {
        label: '이름 변경',
        onClick: handleNameChange,
        icon: <Icon.EditLine width={16} height={16} className="mr-8" />,
      },
      {
        label: '캘린더 삭제',
        onClick: () => handleCalendarDelete('subCalendar'),
        icon: <Icon.DeleteLine width={16} height={16} className="mr-8" />,
      },
    ],
    subscribe: [
      {
        label: '이름 변경',
        onClick: handleNameChange,
        icon: <Icon.EditLine width={16} height={16} className="mr-8" />,
      },
      {
        label: '캘린더 동기화',
        onClick: handleCalendarSync,
        icon: <Icon.RenewLine width={16} height={16} className="mr-8" />,
      },
      {
        label: '캘린더 삭제',
        onClick: () => handleCalendarDelete('subscribe'),
        icon: <Icon.DeleteLine width={16} height={16} className="mr-8" />,
      },
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
