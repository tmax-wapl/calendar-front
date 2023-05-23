import { styled, Mui } from '@wapl/ui';

export const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
`;

export const NotificationWrapper = styled.div`
  display: flex;
  flex: 1;
`;

export const ItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ItemContent = styled.div`
  display: flex;
  gap: 10px;
  height: 48px;
  align-items: center;
`;
export const NotificationLabel = styled.div`
  flex: 1;
`;
export const Label = styled.span``;

export const Selected = styled.span<{ selected: boolean }>`
  display: ${({ selected }) => (selected ? 'flex' : 'none')};
  width: 14px;
  height: 1.5px;
  transform: rotate(137deg);
  background: #ff6258;
  &::after {
    content: '';
    left: 69%;
    top: 247%;
    width: 7px;
    height: 1.5px;
    transform: rotate(95deg);
    position: absolute;
    background: #ff6258;
  }
`;

export const NotificationItemContainer = styled.div`
  display: flex;
  flex: 1;
  height: 48px;
  align-items: center;
`;

export const NotificationItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  align-items: center;
  height: 48px;
`;

export const IconButton = styled(Mui.IconButton)`
  padding: 0;
`;
