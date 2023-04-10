import { styled } from '@wapl/ui';

export const EventItemContainer = styled.div<{ isDetail: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  box-sizing: border-box;
  ${({ isDetail }) => !isDetail && 'padding: 12px 0 10px; cursor: pointer;'}
`;

export const ItemTitleContainer = styled.div<{ isDetail: boolean }>`
  display: flex;
  align-items: center;
  :not(:last-of-type) {
    margin-bottom: ${({ isDetail }) => (isDetail ? '14px' : '5px')};
  }
  > svg:first-of-type {
    margin-right: 10px !important;
  }
`;

export const EventTitle = styled.span`
  display: block;
  flex: 1;
  ${({ theme: { Font } }) => Font.Text.m.Regular};
  color: ${({ theme: { Color } }) => Color.Gray[900]};
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const EventInfoContainer = styled.div<{ isDetail: boolean }>`
  display: flex;
  flex-direction: column;
  ${({ theme: { Font } }) => Font.Text.s.Regular};
  color: ${({ theme: { Color } }) => Color.Gray[600]};
  margin-left: 28px;
  > :not(:last-of-type) {
    margin-bottom: ${({ isDetail }) => (isDetail ? '4px' : '2px')};
  }
  > :last-of-type {
    margin-bottom: ${({ isDetail }) => (isDetail ? '2px' : '4px')};
  }
`;

export const EventInfo = styled.span``;

export const CalendarName = styled.span`
  ${({ theme: { Font } }) => Font.Text.xs.Regular};
  color: ${({ theme: { Color } }) => Color.Gray[800]};
  margin-left: 28px;
`;
