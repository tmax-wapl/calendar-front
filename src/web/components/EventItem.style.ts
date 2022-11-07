import { styled } from '@wapl/ui';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  box-sizing: border-box;
  padding: 12px 8px;
  cursor: pointer;
  > span {
    margin-left: 28px;
  }
`;

export const ItemTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  :not(:last-child) {
    margin-bottom: 8px;
  }
  > svg {
    :first-of-type {
      margin-right: 10px;
    }
    :not(first-of-type) {
      margin-right: 8px;
    }
  }
`;

export const EventTitle = styled.span`
  display: flex;
  font-size: 14px;
`;

export const EventDate = styled.span`
  display: flex;
  font-size: 13px;
  color: #80868b;
  white-space: nowrap;
  overflow-x: hidden;
  margin: 4px 0;
`;

export const CalendarName = styled.span`
  display: flex;
  font-size: 12px;
`;
