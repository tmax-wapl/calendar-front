import { styled, Mui } from '@wapl/ui';

export const NotificationsContainer = styled.div`
  display: flex;
  width: 100%;
  > svg {
    margin-top: 12px;
  }
`;

export const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
`;

export const NotificationItem = styled.div`
  display: flex;
  height: 44px;
  align-items: center;
`;

export const IconButton = styled(Mui.IconButton)`
  padding: 0;
  margin-left: auto;
`;

export const NotificationAddItem = styled.div`
  display: flex;
  height: 32px;
  align-items: center;
  color: #9aa0a6;
  cursor: pointer;
  > svg {
    margin-left: auto;
  }
`;

export const NotificationsTitle = styled.span`
  display: flex;
  height: 44px;
  align-items: center;
`;
