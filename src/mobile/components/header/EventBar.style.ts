import { styled, Mui } from '@wapl/ui';

export const EventBarContainer = styled.div`
  display: flex;
  flex-shrink: 0;
  width: 100%;
  height: 56px;
  align-items: center;
  box-sizing: border-box;
  padding: 0 16px;
`;

export const IconButton = styled(Mui.IconButton)`
  padding: 0;
  & + span {
    margin-left: 8px;
  }
  & + & {
    margin-left: 12px;
  }
`;

export const EventBarTitle = styled.span`
  display: block;
  flex: 1;
  margin-right: 8px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  ${({ theme: { Font } }) => Font.Text.xl.Medium};
`;
