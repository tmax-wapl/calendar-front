import { styled } from '@wapl/ui';

export const LocationContainer = styled.div`
  display: flex;
  height: 44px;
  align-items: center;
`;

export const LocationInput = styled.input`
  display: flex;
  flex: 1;
  width: 100%;
  border: none;
  outline: none;
  ::placeholder {
    font-size: 14px;
    color: #9aa0a6;
  }
`;
