import { styled } from '@wapl/ui';

export const CalendarManageViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 16px;
`;

export const Divider = styled.span`
  height: 1px;
  background: ${({ theme: { Color } }) => Color.Gray[200]};
  border-radius: 1px;
`;
