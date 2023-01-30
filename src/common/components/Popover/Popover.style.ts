import { styled, Mui } from '@wapl/ui';

export const Popover = styled(Mui.Popover)`
  .MuiPopover-paper {
    border-radius: 12px;
  }
`;

export const PopoverContainer = styled.div`
  position: absoulte;
  width: 280px;
  z-index: 9999;
  box-shadow: 0 2px 6px rgb(0 0 0 / 15%);
  border-radius: 12px;
`;

export const PopoverHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;
export const PopoverBody = styled.div`
  padding: 0 8px 8px;
  max-height: 180px;
  overflow: auto;
`;
export const PopoverTitle = styled.span`
  font-weight: 500;
  font-size: 20px;
`;
export const PopoverIcon = styled.span`
  &:hover {
    cursor: pointer;
  }
`;

export const EventWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 44px;
  padding: 0 12px;
  &:hover {
    cursor: pointer;
    background: #ededed;
    border-radius: 8px;
  }
`;
export const EventIcon = styled.div<{ backgroundColor: string }>`
  width: 16px;
  height: 16px;
  border-radius: 25px;
  background-color: ${props => props.backgroundColor};
  margin-right: 10px;
`;
export const EventTitle = styled.div`
  font-weight: 400;
  font-size: 14px;
`;
