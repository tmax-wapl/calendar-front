/* eslint-disable react/jsx-key */
import React from 'react';
import { Icon, Mui, styled } from '@wapl/ui';

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
  const menuItem: { [key: string]: MenuItem[] } = {
    persona: [{ label: '이름 변경', onClick: console.log('이름 변경'), icon: <Icon.EditLine className="mr-8" /> }],
    subscribe: [
      { label: '이름 변경', onClick: console.log('이름 변경'), icon: <Icon.EditLine className="mr-8" /> },
      { label: '캘린더 삭제', onClick: () => console.log('캘린더 삭제'), icon: <Icon.DeleteLine className="mr-8" /> },
    ],
    event: [
      { label: '일정 수정', onClick: () => console.log('일정 수정'), icon: <Icon.EditLine className="mr-8" /> },
      { label: '일정 공유', onClick: () => console.log('일정 공유'), icon: <Icon.ShareLine className="mr-8" /> },
      { label: '일정 삭제', onClick: () => console.log('일정 삭제'), icon: <Icon.DeleteLine className="mr-8" /> },
    ],
  };

  const RenderItem = (): JSX.Element[] => {
    return menuItem[type]?.map(item => (
      <>
        <Mui.MenuItem onClick={item.onClick}>
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
