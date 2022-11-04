import { styled } from '@wapl/ui';

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

// TODO: wapl/ui
export const SearchBar = styled.input`
  min-width: 360px;
  background: #f1f3f4;
  border: none;
  border-radius: 8px;
`;
