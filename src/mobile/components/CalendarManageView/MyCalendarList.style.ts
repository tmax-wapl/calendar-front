import { styled } from '@wapl/ui';

export const MyCalendarListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FilterName = styled.div`
  display: flex;
  height: 28px;
  align-items: center;
  ${({ theme: { Font } }) => Font.Text.s.Medium};
  color: ${({ theme: { Color } }) => Color.Gray[900]};
`;
