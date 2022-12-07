import React from 'react';
import { Icon, Mui, styled } from '@wapl/ui';
import { useCalendarStores } from '@/stores/StoreProvider';

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

export const ContextMenuItem = ({ type }: { type: string }) => {
  const { uiStore } = useCalendarStores();

  const deleteCalendar = () => {
    console.log('캘린더 삭제');
  };

  const deleteEvent = () => {
    console.log('일정 삭제');
  };

  const closeDialog = () => {
    uiStore.dialogInfo = null;
  };

  const handleNameChange = () => {
    console.log('이름 변경');
  };

  const handleCalendarDelete = () => {
    uiStore.dialogInfo = {
      action: 'shareCalendarDelete',
      onClick: [closeDialog, deleteCalendar],
    };
  };

  const handleEventEdit = () => {
    console.log('일정 수정');
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
      <>
        <Mui.MenuItem key={item.label} onClick={item.onClick}>
          <MenuItemWrapper>
            {item.icon}
            {item.label}
          </MenuItemWrapper>
        </Mui.MenuItem>
      </>
    ));
  };

  return <ContextMenuItemContainer>{RenderItem()}</ContextMenuItemContainer>;
};
