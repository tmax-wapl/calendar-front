import { styled } from '@wapl/ui';

export const CalendarManageViewContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
`;

export const ContentContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  padding: 0px 16px;
  overflow-y: scroll;
`;

export const Divider = styled.span`
  height: 1px;
  background: ${({ theme: { Color } }) => Color.Gray[200]};
  border-radius: 1px;
  flex-shrink: 0;
`;
