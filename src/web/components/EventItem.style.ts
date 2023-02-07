import { styled } from '@wapl/ui';

export const EventItemContainer = styled.div<{ isDetail: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  box-sizing: border-box;
  padding: ${({ isDetail }) => (isDetail ? '0' : '12px 8px 10px')};
  margin-bottom: ${({ isDetail }) => (isDetail ? '8px' : '0')};
  ${({ isDetail }) => !isDetail && 'cursor: pointer;'}
  > span {
    margin-left: 28px;
  }
`;

export const ItemTitleContainer = styled.div<{ isDetail: boolean }>`
  display: flex;
  align-items: center;
  :not(:last-child) {
    margin-bottom: ${({ isDetail }) => (isDetail ? '12px' : '4px')};
  }
  > svg:first-of-type {
    margin-right: 10px !important;
  }
`;

export const EventTitle = styled.span`
  display: block;
  flex: 1;
  font-size: 14px;
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const EventInfo = styled.span`
  display: flex;
  font-size: 13px;
  color: #80868b;
  white-space: nowrap;
  overflow-x: hidden;
`;

export const CalendarName = styled.span`
  display: flex;
  font-size: 12px;
  margin-top: 4px;
`;
