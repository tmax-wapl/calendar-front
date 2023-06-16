import { styled, Mui } from '@wapl/ui';

export const OtherCalendarListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
  display: flex;
  height: 28px;
  align-items: center;
  ${({ theme: { Font } }) => Font.Text.s.Medium};
  color: ${({ theme: { Color } }) => Color.Gray[900]};
`;

export const FilterName = styled(Title)`
  color: ${({ theme: { Color } }) => Color.Gray[600]};
`;

export const IconButton = styled(Mui.IconButton)`
  width: 20px;
  height: 28px;
  margin-right: 7.5px;
  padding: 0;
`;

export const TitleSpan = styled.span`
  margin-right: auto;
`;
