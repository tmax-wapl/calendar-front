import { styled, SearchField as WSearchField } from '@wapl/ui';

export const EventHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const EventCreateButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme: { Font } }) => Font.Text.s.Medium};
  font-weight: 400;
  width: 79px;
  border-radius: 6px;
  background: ${({ theme: { Color } }) => Color.Gray[900]};
  color: #ffffff;
  height: 32px;
  margin: 0px 12px;
  &:hover {
    cursor: pointer;
  }
`;

export const SearchField = styled(WSearchField)`
  .MuiFilledInput-root {
    height: 32px;
  }
  .MuiInputBase-input {
    ${({ theme: { Font } }) => Font.Text.m.Regular};
    ::placeholder {
      ${({ theme: { Font } }) => Font.Text.m.Regular};
    }
  }
`;
