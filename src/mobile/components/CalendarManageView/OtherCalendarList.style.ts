import { styled, Mui } from '@wapl/ui';

export const OtherCalendarListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FilterName = styled.div`
  display: flex;
  height: 28px;
  align-items: center;
  ${({ theme: { Font } }) => Font.Text.s.Medium};
  color: ${({ theme: { Color } }) => Color.Gray[600]};
`;

export const AddButton = styled(Mui.IconButton)`
  width: 28px;
  height: 28px;
  margin-left: auto;
  padding: 0;
`;
