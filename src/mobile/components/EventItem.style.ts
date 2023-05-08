import { styled } from '@wapl/ui';

export const EventItemContainer = styled.li<{ isDetail: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  box-sizing: border-box;
  ${({ isDetail }) => !isDetail && 'padding: 10px 0 7px; cursor: pointer;'}
`;

export const ItemTitleContainer = styled.div<{ isDetail: boolean }>`
  display: flex;
  align-items: center;
  :not(:last-of-type) {
    margin-bottom: 4px;
  }
  > svg:first-of-type {
    margin-right: 8px !important;
  }
`;

export const EventTitle = styled.span`
  display: block;
  flex: 1;
  ${({ theme: { Font } }) => Font.Text.l.Regular};
  color: ${({ theme: { Color } }) => Color.Gray[900]};
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const EventInfoContainer = styled.div<{ isDetail: boolean }>`
  display: flex;
  flex-direction: column;
  ${({ theme: { Font } }) => Font.Text.xs.Regular};
  color: ${({ theme: { Color } }) => Color.Gray[600]};
  margin-left: 24px;
  > :not(:last-of-type) {
    margin-bottom: 2px;
  }
`;

export const EventInfo = styled.span`
  white-space: nowrap;
`;

export const CalendarName = styled.span`
  ${({ theme: { Font } }) => Font.Text.xs.Regular};
  color: ${({ theme: { Color } }) => Color.Gray[800]};
  margin-left: 24px;
`;
