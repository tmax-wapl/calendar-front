import { styled, Mui } from '@wapl/ui';

export const NotificationItemContainer = styled.div<{ isMobile: boolean }>`
  display: flex;
  height: ${({ isMobile }) => (isMobile ? 48 : 44)}px;
  align-items: center;
`;

export const NotificationItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  align-items: center;
  height: 48px;
`;

export const IconButton = styled(Mui.IconButton)<{ isMobile: boolean }>`
  padding: 0;
  ${({ isMobile }) => (isMobile ? '' : 'margin-left: auto;')}
`;

export const NotificationLabel = styled.div`
  flex: 1;
`;
