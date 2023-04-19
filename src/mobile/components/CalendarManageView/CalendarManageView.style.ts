import { styled } from '@wapl/ui';

export const CalendarManageViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 16px;
`;

export const FilterName = styled.div`
  display: flex;
  height: 28px;
  align-items: center;
  ${({ theme: { Font } }) => Font.Text.s.Medium};
  color: ${({ theme: { Color } }) => Color.Gray[600]};
`;

export const Divider = styled.span`
  height: 1px;
  background: ${({ theme: { Color } }) => Color.Gray[200]};
  border-radius: 1px;
`;
