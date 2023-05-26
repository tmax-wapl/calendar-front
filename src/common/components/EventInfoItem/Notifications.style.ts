import { styled } from '@wapl/ui';

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

export const NotificationAddItem = styled.div<{ isEmpty: boolean }>`
  display: flex;
  height: ${({ isEmpty }) => (isEmpty ? 44 : 32)}px;
  align-items: center;
  color: ${({ theme: { Color } }) => Color.Gray[500]};
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

export const ItemContent = styled.div`
  display: flex;
  gap: 10px;
  height: 48px;
  align-items: center;
`;

export const Label = styled.span``;
