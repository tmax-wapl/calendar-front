import { styled, SearchField as WSearchField } from '@wapl/ui';

export const EventHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const EventCreateButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 400;
  width: 79px;
  border-radius: 6px;
  background: #202124;
  color: #ffffff;
  height: 32px;
  margin: 0px 12px;
  &:hover {
    cursor: pointer;
  }
`;

export const SearchField = styled(WSearchField)`
  .MuiInputBase-input {
    font-size: 14px;
    ::placeholder {
      font-size: 14px;
    }
  }
`;
